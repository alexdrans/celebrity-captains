import { Pool } from 'pg';

const pool = new Pool({
  host: 'postgres',
  user: 'postgres',
  password: process.env.PGPASSWORD,
  database: 'postgres',
});

export const connection = pool;
