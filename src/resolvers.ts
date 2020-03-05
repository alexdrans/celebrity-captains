import {
  Arrival,
  MutationCreateArrivalArgs,
  QueryGetArrivalsArgs,
  ArrivalConnection,
} from './types/generated';
import { getArrivalsDb, insertArrivalDb } from './db';
import { logger } from './lib/logger';
import { Context } from './types';

const getArrivals = async (
  _parent: any,
  args: QueryGetArrivalsArgs,
  context: Context
): Promise<ArrivalConnection> => {
  logger.debug('Invoking getVisits');

  logger.debug('Input args:', args);
  const res = await getArrivalsDb(args, context);

  logger.info('Query OK.');
  logger.debug('Result:', JSON.stringify(res, null, 2));

  return res;
};

const createArrival = async (
  _parent: any,
  args: MutationCreateArrivalArgs,
  context: Context
): Promise<Arrival> => {
  logger.debug('Invoking createArrival');

  logger.debug('Input args:', args);
  const res = await insertArrivalDb(args.input, context);

  logger.info('Query OK');
  logger.debug('Result', JSON.stringify(res, null, 2));

  return res;
};

export const resolvers = {
  Query: {
    getArrivals,
  },
  Mutation: {
    createArrival,
  },
};
