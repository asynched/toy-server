"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToyDatabase = void 0;
const chance_1 = require("chance");
const symbols_1 = require("../symbols");
/**
 * # ToyDatabase
 *
 * A database class that provides data on demand.
 */
class ToyDatabase {
    /**
     * # ToyDatabase
     *
     * A database for the toy server, it generates the requested data by the
     * client.
     *
     * @example
     *
     * new ToyDatabase({
     *  numbers: new Collection(new Integer())
     * })
     *
     * @param schema The schema of the database.
     */
    constructor(schema) {
        this[symbols_1.kSchema] = schema;
        this[symbols_1.kProvider] = new chance_1.Chance();
    }
}
exports.ToyDatabase = ToyDatabase;
