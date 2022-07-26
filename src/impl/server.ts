import { CollectionTrait } from '../domain/generators'
import {
  RequestTrait,
  ResponseTrait,
  ToyHTTPAdapterTrait,
} from '../domain/http'
import { ToyDatabase } from './database'
import { kProvider, kSchema } from '../symbols'

type ToyServerOptions = {
  database: ToyDatabase
  adapter: ToyHTTPAdapterTrait
}

/**
 * # ToyServer
 *
 * An HTTP server that can be used in conjunction with the toy database to
 * serve mock data in a REST API.
 *
 * @example
 *
 * const server = new ToyServer({
 *   database: new ToyDatabase({
 *     names: new Collection(new Name())
 *   }),
 *   adapter: new ToyExpressAdapter()
 * })
 *
 * server.listen(3333, (port) => console.log('Server has started on port', port))
 */
export class ToyServer {
  private database: ToyDatabase
  private adapter: ToyHTTPAdapterTrait

  public constructor({ database, adapter }: ToyServerOptions) {
    this.database = database
    this.adapter = adapter

    this.setupAdapter()
  }

  private setupAdapter() {
    for (const key in this.database[kSchema]) {
      const generator = this.database[kSchema][key]
      const handlers = this.makeEndpointHandler(generator)
      this.adapter.registerEndpoint(`/${key}`, handlers)
    }
  }

  private makeEndpointHandler(generator: CollectionTrait<unknown>) {
    return {
      list: (req: RequestTrait, res: ResponseTrait) => {
        const limit = +req.query.limit || 100

        const data = generator.generate(this.database[kProvider], {
          many: limit,
        })

        res.status(200).json(data)
      },
      single: (req: RequestTrait, res: ResponseTrait) => {
        const data = generator.generate(this.database[kProvider], {
          many: 1,
        })

        res.status(200).json(data)
      },
    }
  }

  /**
   * # listen
   *
   * Starts the HTTP server.
   *
   * @example
   *
   * const server = new ToyHTTPServer({ ... })
   * server.listen(3333, (port) => console.log('Server has started on port', port))
   *
   * @param port The port to listen to.
   * @param callback An optional callback to be called when the server starts.
   */
  public listen(
    port: number,
    callback?: (port: number) => void | Promise<void>
  ) {
    this.adapter.listen(port, callback)
  }
}
