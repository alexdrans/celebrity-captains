import { logger } from '../lib/logger';
import { Pool } from 'pg';

export interface Context {
  logger: typeof logger;
  connection: Pool;
}
