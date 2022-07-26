# toy-server

A mock server for when you don't want to code a back-end from scratch!

## About

Writing an app is a pretty time consuming task, especially when you have an idea of the front-end functionality but don't have the back-end needed to build it. Sometimes, even having a back-end isn't enough, as you need to populate a database with mock data. This package aims to solve this problem, as it provides a series of primitives to build an API with a user defined schema.

## The gist

Getting a hang for the toy-server is pretty simple, we show a blog example below.

```ts
import {
  ToyServer,
  ToyDatabase,
  Schema,
  Collection,
  Name,
  Email,
  GUID,
  Sentence,
  Paragraph,
} from '@asynched/toy-server'

// In here, we define a generator for the application, this specifically
// is a schema generator, which will build an object with the given keys
// when requested.
// In here, we define that the user has an id, a name and an email.
const userSchema = new Schema({
  id: new GUID(),
  name: new Name(),
  email: new Email(),
})

// The same is being done here, as we define a schema
// for the post. Notice here that we are using the user
// schema to build a new user when a post object is
// requested.
const postSchema = new Schema({
  id: new GUID(),
  title: new Sentence(),
  content: new Paragraph(),
  user: userSchema,
})

// A collection here is a list of objects that can
// be requested by the server at runtime. It is
// similar to a collection in something like the
// mongoose adapter.
const userCollection = new Collection(userSchema)
const postCollection = new Collection(postSchema)

// In here, we make a new server instance giving it the
// database with the defined schema and an adapter.
//
// Database:
// As you can see below, the database is an object that
// will be converted as endpoints at runtime. Each entry
// of the object will be an endpoint that can be accessed
// by using it's name, let's say `/users`.
//
// Adapter:
// The adapter is an object that will be used to create the
// server at runtime.
const server = new ToyServer({
  database: new ToyDatabase({
    users: userCollection,
    posts: postCollection,
  }),
  adapter: new ToyExpressAdapter(),
})

// In here, we start the server an wait for requests.
server.listen(3333, (port) => console.log(`Listening on port ${port}`))
```

> Pretty simple, isn't it?

## Author

| ![Eder Lima](https://github.com/asynched.png?size=100) |
| ------------------------------------------------------ |
| [Eder Lima](https://github.com/asynched)               |
