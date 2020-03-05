import { ApolloServer } from 'apollo-server';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';
import { logger } from './lib/logger';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context: {
    logger,
  },
});

server.listen().then(({ url }: { url: string }) => {
  console.log('Server ready at', url);
});
