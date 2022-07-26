import express, { Express } from 'express'
import { ToyHTTPAdapterTrait, ToyRequestHandlerTrait } from '../domain/http'

/**
 * # ToyExpressAdapter
 *
 * A concretion for the ToyHTTPAdapterTrait that can be used with the
 * ToyServer.
 *
 * @example
 *
 * const adapter = new ToyExpressAdapter()
 * const server = new ToyHTTPServer({ adapter })
 */
export class ToyExpressAdapter implements ToyHTTPAdapterTrait {
  private app: Express
  constructor() {
    this.app = express()
  }

  registerEndpoint(
    endpoint: string,
    handlers: Record<'list' | 'single', ToyRequestHandlerTrait>
  ) {
    this.app.get(endpoint, handlers.list)
    this.app.get(`${endpoint}/:id`, handlers.single)
    this.app.delete(`${endpoint}/:id`, (req, res) => {
      res.status(204).end()
    })

    return this
  }

  listen(port: number, callback?: (port: number) => void | Promise<void>) {
    this.app.listen(port, callback?.bind(null, port))
  }
}
