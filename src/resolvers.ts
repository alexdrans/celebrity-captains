import { Captain, Ship, Arrival } from './types/generated';
import { getCaptainsDb } from './db';

const captains: Captain[] = [
  {
    id: '123',
    name: 'Bob',
  },
  {
    id: '456',
    name: 'Charles',
  },
];

const ships: Ship[] = [
  {
    id: '123',
    name: 'Big boat',
  },
  {
    id: '456',
    name: 'Pacific Fantastic',
  },
];

const arrivals: Arrival[] = [
  {
    ship: ships[0],
    captain: captains[0],
    arrivalTime: new Date(),
  },
  {
    ship: ships[1],
    captain: captains[1],
    arrivalTime: new Date(),
  },
];

export const resolvers = {
  Query: {
    ships: (): Ship[] => ships,
    captains: getCaptainsDb,
    arrivals: (): Arrival[] => arrivals,
  },
};
