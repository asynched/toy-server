/**
 * # GeneratorTrait
 *
 * A trait representing a generator of some sort.
 */
export interface GeneratorTrait<T> {
  /**
   * # generate
   *
   * Generate a value of the parameter type to the client.
   *
   * @param provider A random value provider.
   */
  generate(provider: Chance.Chance): T
}

/**
 * # CollectionTrait
 *
 * Options for the collection trait.
 */
export type CollectionTraitOptions = {
  /**
   * # many
   *
   * The number of items to generate.
   */
  many: number
}

/**
 * # CollectionTrait
 *
 * A trait representing a collection of some sort.
 */
export interface CollectionTrait<T> {
  /**
   * # generate
   *
   * Generate a collection of the parameter type to the client.
   *
   * @param provider A random value provider.
   * @param options Options for the collection.
   */
  generate(provider: Chance.Chance, options: CollectionTraitOptions): T[]
}
