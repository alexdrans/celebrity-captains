import { gql } from 'apollo-server';
import { DocumentNode } from 'graphql';

export const typeDefs: DocumentNode = gql`
  scalar Date

  type Captain {
    id: ID!
    name: String
  }

  type Ship {
    id: ID!
    name: String
  }

  type Port {
    id: ID!
    name: String
  }

  type Arrival {
    ship: Ship
    captain: Captain
    port: Port
    arrivalTime: Date
  }

  type Query {
    ships: [Ship]
    captains: [Captain]
    arrivals: [Arrival]
  }
`;
