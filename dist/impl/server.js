"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToyServer = void 0;
const symbols_1 = require("../symbols");
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
class ToyServer {
    constructor({ database, adapter }) {
        this.database = database;
        this.adapter = adapter;
        this.setupAdapter();
    }
    setupAdapter() {
        for (const key in this.database[symbols_1.kSchema]) {
            const generator = this.database[symbols_1.kSchema][key];
            const handlers = this.makeEndpointHandler(generator);
            this.adapter.registerEndpoint(`/${key}`, handlers);
        }
    }
    makeEndpointHandler(generator) {
        return {
            list: (req, res) => {
                const limit = +req.query.limit || 100;
                const data = generator.generate(this.database[symbols_1.kProvider], {
                    many: limit,
                });
                res.status(200).json(data);
            },
            single: (req, res) => {
                const data = generator.generate(this.database[symbols_1.kProvider], {
                    many: 1,
                });
                res.status(200).json(data);
            },
        };
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
    listen(port, callback) {
        this.adapter.listen(port, callback);
    }
}
exports.ToyServer = ToyServer;
