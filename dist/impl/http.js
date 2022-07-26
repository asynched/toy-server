"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToyExpressAdapter = void 0;
const express_1 = __importDefault(require("express"));
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
class ToyExpressAdapter {
    constructor() {
        this.app = (0, express_1.default)();
    }
    registerEndpoint(endpoint, handlers) {
        this.app.get(endpoint, handlers.list);
        this.app.get(`${endpoint}/:id`, handlers.single);
        this.app.delete(`${endpoint}/:id`, (req, res) => {
            res.status(204).end();
        });
        return this;
    }
    listen(port, callback) {
        this.app.listen(port, callback === null || callback === void 0 ? void 0 : callback.bind(null, port));
    }
}
exports.ToyExpressAdapter = ToyExpressAdapter;
