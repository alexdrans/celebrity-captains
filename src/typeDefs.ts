import { gql } from 'apollo-server';
import { DocumentNode } from 'graphql';

export const typeDefs: DocumentNode = gql`
  scalar Date

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

  type Query {
    arrivals: [Arrival]
    getArrivals(id: ID, name: String, sort: Sort): [Arrival]
  }

  input createArrivalInput {
    captainName: String!
    vesselName: String!
    port: String!
    arrivedAt: Date!
  }

  type Mutation {
    createArrival(input: createArrivalInput!): Arrival
  }
`;
