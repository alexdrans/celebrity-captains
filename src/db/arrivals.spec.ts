import { insertArrivalDb, getArrivalsDb } from './arrivals';
import {
  CreateArrivalInput,
  QueryGetArrivalsArgs,
  Sort,
} from '../types/generated';
import { Context } from '../types';
import { logger } from '../lib/logger';
import { toCursor } from '../lib/cursors';

describe('arrivals db', () => {
  test('Will correctly insert arrival', async () => {
    const fakeConnection: any = {
      query: jest.fn().mockReturnValue({ rows: [{}] }),
    };
    const fakeContext: Context = {
      connection: fakeConnection,
      logger,
    };
    const arrivedAt = new Date();
    const args: CreateArrivalInput = {
      captainName: 'Captain Test',
      vesselName: 'HMS JavaScript',
      port: 'Port of Shanghai',
      arrivedAt: arrivedAt.toString(),
    };

    const expectedQuery = `INSERT INTO arrivals (captain_name, vessel_name, port, arrived_at) VALUES ('${args.captainName}', '${args.vesselName}', '${args.port}', '${args.arrivedAt}') RETURNING *`;

    await insertArrivalDb(args, fakeContext);

    expect(fakeConnection.query).toHaveBeenCalledWith(expectedQuery);
  });

  test('Will correctly query arrivals with empty table', async () => {
    const fakeConnection: any = {
      query: jest.fn().mockReturnValue({ rows: [] }),
    };
    const fakeContext: Context = {
      connection: fakeConnection,
      logger,
    };

    const args: QueryGetArrivalsArgs = {
      id: '1',
      captainName: 'Captain Test',
      pagination: {
        first: 25,
      },
    };

    const expectedQuery = `SELECT * FROM arrivals WHERE id = '${
      args.id
    }' AND captain_name = '${
      args.captainName
    }' ORDER BY arrived_at DESC LIMIT ${args.pagination.first + 1}`;

    const response = await getArrivalsDb(args, fakeContext);

    expect(response).toEqual({
      edges: [],
      pageInfo: { hasNextPage: false, endCursor: null },
    });
    expect(fakeConnection.query).toHaveBeenCalledWith(expectedQuery);
  });

  test('Will correctly query arrivals if id and name are provided', async () => {
    const fakeConnection: any = {
      query: jest.fn().mockReturnValue({ rows: [{}] }),
    };
    const fakeContext: Context = {
      connection: fakeConnection,
      logger,
    };

    const args: QueryGetArrivalsArgs = {
      id: '1',
      captainName: 'Captain Test',
      pagination: {
        first: 25,
      },
    };

    const expectedQuery = `SELECT * FROM arrivals WHERE id = '${
      args.id
    }' AND captain_name = '${
      args.captainName
    }' ORDER BY arrived_at DESC LIMIT ${args.pagination.first + 1}`;

    await getArrivalsDb(args, fakeContext);

    expect(fakeConnection.query).toHaveBeenCalledWith(expectedQuery);
  });

  test('Will correctly query arrivals if id is provided', async () => {
    const fakeConnection: any = {
      query: jest.fn().mockReturnValue({ rows: [{}] }),
    };
    const fakeContext: Context = {
      connection: fakeConnection,
      logger,
    };

    const args: QueryGetArrivalsArgs = {
      id: '1',
      pagination: {
        first: 25,
      },
    };

    const expectedQuery = `SELECT * FROM arrivals WHERE id = '${
      args.id
    }' ORDER BY arrived_at DESC LIMIT ${args.pagination.first + 1}`;

    await getArrivalsDb(args, fakeContext);

    expect(fakeConnection.query).toHaveBeenCalledWith(expectedQuery);
  });

  test('Will correctly query arrivals if name is provided', async () => {
    const fakeConnection: any = {
      query: jest.fn().mockReturnValue({ rows: [{}] }),
    };
    const fakeContext: Context = {
      connection: fakeConnection,
      logger,
    };

    const args: QueryGetArrivalsArgs = {
      captainName: 'Captain Test',
      pagination: {
        first: 25,
      },
    };

    const expectedQuery = `SELECT * FROM arrivals WHERE captain_name = '${
      args.captainName
    }' ORDER BY arrived_at DESC LIMIT ${args.pagination.first + 1}`;

    await getArrivalsDb(args, fakeContext);

    expect(fakeConnection.query).toHaveBeenCalledWith(expectedQuery);
  });

  test('Will correctly query arrivals if pagination.limit is provided', async () => {
    const fakeConnection: any = {
      query: jest.fn().mockReturnValue({ rows: [{}] }),
    };
    const fakeContext: Context = {
      connection: fakeConnection,
      logger,
    };

    const args: QueryGetArrivalsArgs = {
      id: '1',
      captainName: 'Captain Test',
      pagination: {
        first: 10,
      },
    };

    const expectedQuery = `SELECT * FROM arrivals WHERE id = '${
      args.id
    }' AND captain_name = '${
      args.captainName
    }' ORDER BY arrived_at DESC LIMIT ${args.pagination.first + 1}`;

    await getArrivalsDb(args, fakeContext);

    expect(fakeConnection.query).toHaveBeenCalledWith(expectedQuery);
  });

  test('Will correctly query arrivals if a pagination.limit value exceeding the limit is provided', async () => {
    const fakeConnection: any = {
      query: jest.fn().mockReturnValue({ rows: [{}] }),
    };
    const fakeContext: Context = {
      connection: fakeConnection,
      logger,
    };

    const args: QueryGetArrivalsArgs = {
      id: '1',
      captainName: 'Captain Test',
      pagination: {
        first: 99999999,
      },
    };

    const upperLimit = 100;

    const expectedQuery = `SELECT * FROM arrivals WHERE id = '${
      args.id
    }' AND captain_name = '${
      args.captainName
    }' ORDER BY arrived_at DESC LIMIT ${upperLimit + 1}`;

    await getArrivalsDb(args, fakeContext);

    expect(fakeConnection.query).toHaveBeenCalledWith(expectedQuery);
  });

  test('Will correctly query arrivals if sorted by ASC', async () => {
    const fakeConnection: any = {
      query: jest.fn().mockReturnValue({ rows: [{}] }),
    };
    const fakeContext: Context = {
      connection: fakeConnection,
      logger,
    };

    const args: QueryGetArrivalsArgs = {
      id: '1',
      sort: Sort.Asc,
      pagination: {
        first: 25,
      },
    };

    const expectedQuery = `SELECT * FROM arrivals WHERE id = '${
      args.id
    }' ORDER BY arrived_at ASC LIMIT ${args.pagination.first + 1}`;

    await getArrivalsDb(args, fakeContext);

    expect(fakeConnection.query).toHaveBeenCalledWith(expectedQuery);
  });

  test('Will correctly query with after param provided alongside an id', async () => {
    const fakeConnection: any = {
      query: jest.fn().mockReturnValue({ rows: [{}] }),
    };
    const fakeContext: Context = {
      connection: fakeConnection,
      logger,
    };

    const expectedAfter = '2020-03-06T00:00:00+00:00';
    const args: QueryGetArrivalsArgs = {
      id: '1',
      pagination: {
        first: 25,
        after: toCursor(expectedAfter),
      },
    };

    const expectedQuery = `SELECT * FROM arrivals WHERE id = '${
      args.id
    }' AND arrived_at < '${expectedAfter}' ORDER BY arrived_at DESC LIMIT ${args
      .pagination.first + 1}`;

    await getArrivalsDb(args, fakeContext);

    expect(fakeConnection.query).toHaveBeenCalledWith(expectedQuery);
  });

  test('Will correctly query with after param provided alongside a name', async () => {
    const fakeConnection: any = {
      query: jest.fn().mockReturnValue({ rows: [{}] }),
    };
    const fakeContext: Context = {
      connection: fakeConnection,
      logger,
    };

    const expectedAfter = '2020-03-06T00:00:00+00:00';
    const args: QueryGetArrivalsArgs = {
      id: '1',
      pagination: {
        first: 25,
        after: toCursor(expectedAfter),
      },
    };

    const expectedQuery = `SELECT * FROM arrivals WHERE id = '${
      args.id
    }' AND arrived_at < '${expectedAfter}' ORDER BY arrived_at DESC LIMIT ${args
      .pagination.first + 1}`;

    await getArrivalsDb(args, fakeContext);

    expect(fakeConnection.query).toHaveBeenCalledWith(expectedQuery);
  });

  test('Will correctly query with ASC sort order provided', async () => {
    const fakeConnection: any = {
      query: jest.fn().mockReturnValue({ rows: [{}] }),
    };
    const fakeContext: Context = {
      connection: fakeConnection,
      logger,
    };

    const expectedAfter = '2020-03-06T00:00:00+00:00';
    const args: QueryGetArrivalsArgs = {
      id: '1',
      sort: Sort.Asc,
      pagination: {
        first: 25,
        after: toCursor(expectedAfter),
      },
    };

    const expectedQuery = `SELECT * FROM arrivals WHERE id = '${
      args.id
    }' AND arrived_at > '${expectedAfter}' ORDER BY arrived_at ASC LIMIT ${args
      .pagination.first + 1}`;

    await getArrivalsDb(args, fakeContext);

    expect(fakeConnection.query).toHaveBeenCalledWith(expectedQuery);
  });

  test('Will correctly query with after param provided without name or ID', async () => {
    const fakeConnection: any = {
      query: jest.fn().mockReturnValue({ rows: [{}] }),
    };
    const fakeContext: Context = {
      connection: fakeConnection,
      logger,
    };

    const expectedAfter = '2020-03-06T00:00:00+00:00';
    const args: QueryGetArrivalsArgs = {
      pagination: {
        first: 25,
        after: toCursor(expectedAfter),
      },
    };

    const expectedQuery = `SELECT * FROM arrivals WHERE arrived_at < '${expectedAfter}' ORDER BY arrived_at DESC LIMIT ${args
      .pagination.first + 1}`;

    await getArrivalsDb(args, fakeContext);

    expect(fakeConnection.query).toHaveBeenCalledWith(expectedQuery);
  });
});
