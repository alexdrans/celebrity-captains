import { server } from './server';
import { logger } from './lib/logger';
import { ServerInfo } from 'apollo-server';

const port = process.env.PORT || 4000;

server.listen(port).then(({ url }: ServerInfo) => {
  logger.info('Server ready at', url);
});
