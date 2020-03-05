import { ApolloServer } from 'apollo-server';
import { connection } from './db/connection';
import { resolvers } from './resolvers';
import { typeDefs } from './schema';
import { logger } from './lib/logger';

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context: {
    logger,
    connection,
  },
});
