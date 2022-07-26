import { Chance } from 'chance'
import { CollectionTrait } from '../domain/generators'
import { kProvider, kSchema } from '../symbols'

/**
 * # ToyDatabase
 *
 * A database class that provides data on demand.
 */
export class ToyDatabase {
  public [kSchema]: Record<string, CollectionTrait<unknown>>
  public [kProvider]: Chance.Chance

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
  public constructor(schema: Record<string, CollectionTrait<unknown>>) {
    this[kSchema] = schema
    this[kProvider] = new Chance()
  }
}
