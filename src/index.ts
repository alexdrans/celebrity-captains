import { server } from './server';
import { logger } from './lib/logger';
import { ServerInfo } from 'apollo-server';

server.listen().then(({ url }: ServerInfo) => {
  logger.info('Server ready at', url);
});
