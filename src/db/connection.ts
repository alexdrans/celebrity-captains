import { Pool } from 'pg';

const connectionOptions = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
    }
  : {
      host: 'postgres',
      user: 'postgres',
      database: 'postgres',
    };

const pool: Pool = new Pool(connectionOptions);

export const connection = pool;
