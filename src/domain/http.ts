/**
 * # ResponseTrait
 *
 * The response trait is used to create a response object, it is an abstraction
 * wrapping a lower-level response object.
 */
export type ResponseTrait = {
  /**
   * # json
   *
   * Method to send a JSON payload to the client.
   *
   * @param data The data to send to the client.
   */
  json(data: unknown): ResponseTrait
  /**
   * # status
   *
   * Method to set the status code of the response.
   *
   * @param status The status code to send to the client.
   */
  status(status: number): ResponseTrait
}

/**
 * # RequestTrait
 *
 * A representation of the request object, it is a wrapper on top of a
 * lower-level request object.
 */
export type RequestTrait<T = unknown> = {
  /**
   * # body
   *
   * A property of the request to access the body of the request.
   */
  body: T
  /**
   * # params
   *
   * Parameters of the request.
   */
  params: Record<string, string>
  /**
   * # query
   *
   * Query parameters of the request.
   */
  query: Record<string, string>
}

/**
 * # ToyRequestHandlerTrait
 *
 * This trait represents an abstract request handler for the server.
 */
export type ToyRequestHandlerTrait = (
  req: RequestTrait,
  res: ResponseTrait
) => unknown

export type ToyHTTPAdapterTrait = {
  /**
   * # registerEndpoint
   *
   * Registers an endpoint with the adapter.
   *
   * @example
   *
   * // Fictional object, this is just a trait, it must be implemented by some
   * // concrete class.
   * const adapter = new ToyHTTPAdapterTrait()
   * const server = new ToyServer({ adapter })
   *
   * @param endpoint The endpoint to register.
   * @param handlers A list of handlers to be registered by the adapter.
   */
  registerEndpoint(
    endpoint: string,
    handlers: Record<'list' | 'single', ToyRequestHandlerTrait>
  ): ToyHTTPAdapterTrait

  /**
   * # listen
   *
   * Starts the HTTP server, this is used as an implementation contract used by
   * the real ToyServer, as in there the `.listen` method acts as a proxy
   * to the adapters implementation of the listen method.
   *
   * @param port The port to listen to.
   * @param callback An optional callback to be called when the server starts.
   */
  listen(port: number, callback?: (port: number) => void | Promise<void>): void
}
