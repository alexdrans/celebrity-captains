import { connection } from './connection';
import {
  Arrival,
  CreateArrivalInput,
  QueryGetArrivalsArgs,
  Sort,
  ArrivalConnection,
  ArrivalEdge,
} from '../types/generated';
import escape from 'pg-escape';
import camelcaseKeys from 'camelcase-keys';
import moment from 'moment';
import { QueryResult } from 'pg';
import { Context } from '../types';
import { toCursor, fromCursor } from '../lib/cursors';

export const insertArrivalDb = async (
  args: CreateArrivalInput,
  context: Context
): Promise<Arrival> => {
  const query = escape(
    'INSERT INTO arrivals (captain_name, vessel_name, port, arrived_at) VALUES (%L, %L, %L, %L) RETURNING *',
    args.captainName,
    args.vesselName,
    args.port,
    args.arrivedAt
  );

  context.logger.debug('Executing', query);

  const res = await connection.query(query);
  const result = camelcaseKeys(res.rows[0]);
  return (result as unknown) as Arrival;
};

export const getArrivalsDb = async (
  { id, name, pagination, sort = Sort.Desc }: QueryGetArrivalsArgs,
  context: Context
): Promise<ArrivalConnection> => {
  let query = 'SELECT * FROM arrivals';

  if (id && name) {
    query += escape(' WHERE id = %L AND captain_name = %L', id, name);
  } else if (id) {
    query += escape(' WHERE id = %L', id);
  } else if (name) {
    query += escape(' WHERE captain_name = %L', name);
  }

  context.logger.debug('Pagination:', pagination);
  if (pagination.after) {
    const arrival = moment(fromCursor(pagination.after)).format();
    const direction = sort == Sort.Desc ? '<' : '>';
    query +=
      id || name
        ? escape('AND WHERE arrived_at %s %L', direction, arrival)
        : escape(' WHERE arrived_at %s %L', direction, arrival);
  }

  if (['ASC', 'DESC'].includes(sort as string)) {
    query += escape(' ORDER BY arrived_at %I', sort);
  }

  if (pagination.first) {
    query += escape(' LIMIT %s', pagination.first + 1);
  }

  context.logger.debug('Executing', query);

  const res = (await connection.query(query)) as QueryResult<Arrival>;
  const results = camelcaseKeys(res.rows, { deep: true }) as Arrival[];

  const hasNextPage = results.length > pagination?.first;
  const nodes = hasNextPage ? results.slice(0, 1) : results;

  const edges = nodes.map(node => ({ node }));

  if (!edges.length) {
    return {
      edges: [],
      pageInfo: { hasNextPage: false, endCursor: null },
    };
  }

  const endCursor = toCursor(
    new Date(nodes[nodes.length - 1].arrivedAt).toString()
  );

  return {
    edges,
    pageInfo: { hasNextPage, endCursor },
  } as ArrivalConnection;
};
