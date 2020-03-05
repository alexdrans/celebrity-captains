import pino, { Logger } from 'pino';

export const logger: Logger = pino({
  level: 'debug',
  prettyPrint: process.env.NODE_ENV !== 'production',
});
