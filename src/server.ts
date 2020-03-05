import { ApolloServer } from 'apollo-server';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';
import { logger } from './lib/logger';

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context: {
    logger,
  },
});
