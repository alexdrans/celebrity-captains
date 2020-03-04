import { connection } from './connection';
import { Captain } from '../types/generated';
import { QueryResult } from 'pg';

export const getCaptainsDb = async (): Promise<Captain[]> => {
  const res = (await connection.query('SELECT * FROM captains')) as QueryResult<
    Captain
  >;
  if (res.rows) {
    return res.rows;
  }
  return [];
};
