# celebrity-captains

The year is 2057 and ship captains are now considered celebrities throughout the world.

[Live demo](https://celebrity-captains.herokuapp.com/)

## How to run

A docker-compose file has been provied to run the database and server together. Run `yarn up` to bring this up. Use `yarn down` to bring it back down.

The server will be available on `http://localhost:4000`

You can use `yarn dev` outside of Docker to watch the server in development, and `yarn start` to run the production server.

## Type generator

Types are generated from the GraphQL schema and used in resolvers and data access. To generate the types from the schema, run `yarn codegen`

## Tests

`yarn test`

## Example queries

To run the queries, start the application and head to `http://localhost:4000`. Paste the following into the editor;

```
query getArrivals {
  getArrivals(sort: DESC, pagination: { first: 3 }) {
    edges {
      node {
        id
        captainName
        vesselName
        port
        arrivedAt
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}

query getArrivals {
  getArrivals(
    sort: DESC
    pagination: {
      first: 3
      after: "VGh1IE1hciAwNSAyMDIwIDE1OjI0OjM4IEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSk="
    }
  ) {
    edges {
      node {
        id
        captainName
        vesselName
        port
        arrivedAt
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}

mutation createArrival {
  createArrival(
    input: {
      captainName: "Captain McCaptainface"
      vesselName: "Boaty McBoatface"
      port: "Port of Gibraltar"
      arrivedAt: "2019-12-25 12:45:36"
    }
  ) {
    captainName
  }
}
```

## Product

This product implements the celebrity captains task and is made up of an Apollo GraphQL Server and Postgres database.

There are two capabilities; the creation and retrieval of arrivals at ports, by captains and their vessels.