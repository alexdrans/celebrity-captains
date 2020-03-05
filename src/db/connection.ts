import { Pool } from 'pg';

const pool: Pool = new Pool({
  host: 'postgres',
  user: 'postgres',
  database: 'postgres',
});

export const connection = pool;
