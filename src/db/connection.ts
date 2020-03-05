import { Pool } from 'pg';

const pool = new Pool({
  host: 'postgres',
  user: 'postgres',
  database: 'postgres',
});

export const connection = pool;
