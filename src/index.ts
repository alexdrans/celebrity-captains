import { ApolloServer, gql } from 'apollo-server';
import { Captain, Ship } from '../types';

const typeDefs = gql`
  type Captain {
    name: String
    age: String
  }

  type Ship {
    name: String
    captain: Captain
  }

  type Query {
    ships: [Ship]
    captains: [Captain]
  }
`;

const captains: Captain[] = [
  {
    name: 'Bob',
    age: 63,
  },
  {
    name: 'Charles',
    age: 58,
  },
];

const ships: Ship[] = [
  {
    name: 'Wonderful boat',
    captain: captains[0],
  },
  {
    name: 'Pacific Fantastic',
    captain: captains[1],
  },
];

const resolvers = {
  Query: {
    ships: (): Ship[] => ships,
    captains: (): Captain[] => captains,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }: { url: string }) => {
  console.log('Server ready at', url);
});
