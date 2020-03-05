import {
  Arrival,
  MutationCreateArrivalArgs,
  QueryGetArrivalsArgs,
} from './types/generated';
import { getArrivalsDb, insertArrivalDb } from './db';
import { logger } from './lib/logger';
import camelcaseKeys from 'camelcase-keys';
import { Context } from './types';

const getArrivals = async (
  _parent: any,
  args: QueryGetArrivalsArgs,
  context: Context
): Promise<Arrival[]> => {
  logger.debug('Invoking getVisits');

  const res = await getArrivalsDb(args, context);

  logger.info('Query OK.');
  logger.debug('Result:', res);

  return camelcaseKeys(res) as Arrival[];
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
  logger.debug('Result', res);

  return camelcaseKeys(res) as Arrival;
};

export const resolvers = {
  Query: {
    getArrivals,
  },
  Mutation: {
    createArrival,
  },
};
