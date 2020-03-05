# celebrity-captains

Thanks for the fun task!

## How to run

A docker-compose file has been provied to run the database and server together. Run `yarn up` to bring this up. Use `yarn down` to bring it back down.

The server will be available on `http://localhost:4000`

You can use `yarn dev` outside of Docker to watch the server in development, and `yarn start` to run the production server.

## Type generator

Types are generated from the GraphQL schema to be used in resolvers and data access. To generate the types from the schema, run `yarn codegen`
