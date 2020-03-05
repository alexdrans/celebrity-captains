import { connection } from './connection';
import {
  Arrival,
  CreateArrivalInput,
  QueryGetArrivalsArgs,
  Sort,
} from '../types/generated';
import escape from 'pg-escape';
import { QueryResult } from 'pg';
import { Context } from '../types';

export const insertArrivalDb = async (
  args: CreateArrivalInput,
  context: Context
): Promise<Arrival> => {
  try {
    const res = await connection.query(
      escape(
        'INSERT INTO arrivals (captain_name, vessel_name, port, arrived_at) VALUES (%L, %L, %L, %L) RETURNING *',
        args.captainName,
        args.vesselName,
        args.port,
        args.arrivedAt
      )
    );
    return res.rows[0];
  } catch (err) {
    context.logger.error(err);
    throw err;
  }
};

export const getArrivalsDb = async (
  { id, name, sort = Sort.Desc }: QueryGetArrivalsArgs,
  context: Context
): Promise<Arrival[]> => {
  let query = 'SELECT * FROM arrivals';

  if (id && name) {
    query += escape(' WHERE id = %L AND captain_name = %L', id, name);
  } else if (id) {
    query += escape(' WHERE id = %L', id);
  } else if (name) {
    query += escape(' WHERE captain_name = %L', name);
  }

  if (['ASC', 'DESC'].includes(sort as string)) {
    query += escape(' ORDER BY arrived_at %I', sort);
  }

  context.logger.debug('Executing', query);

  const res = (await connection.query(query)) as QueryResult<Arrival>;

  if (res.rows) {
    return res.rows;
  }
  return [];
};
