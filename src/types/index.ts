import { logger } from '../lib/logger';

export interface Context {
  logger: typeof logger;
}
