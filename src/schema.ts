import { gql } from 'apollo-server';
import { DocumentNode } from 'graphql';

export const typeDefs: DocumentNode = gql`
  scalar Date
  scalar Cursor

  type Arrival {
    id: ID!
    vesselName: String!
    captainName: String!
    port: String!
    arrivedAt: Date!
  }

  enum Sort {
    ASC
    DESC
  }

  type ArrivalEdge {
    node: Arrival
    cursor: Cursor
  }

  type PageInfo {
    hasNextPage: Boolean
    endCursor: Cursor
  }

  type ArrivalConnection {
    edges: [ArrivalEdge]
    pageInfo: PageInfo!
  }

  type Query {
    getArrivals(
      id: ID
      captainName: String
      pagination: PaginationInput!
      sort: Sort
    ): ArrivalConnection
  }

  input PaginationInput {
    first: Int!
    after: Cursor
  }

  input CreateArrivalInput {
    captainName: String!
    vesselName: String!
    port: String!
    arrivedAt: Date!
  }

  type Mutation {
    createArrival(input: CreateArrivalInput!): Arrival
  }
`;
