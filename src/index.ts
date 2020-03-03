import { ApolloServer } from 'apollo-server';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }: { url: string }) => {
  console.log('Server ready at', url);
});
