import { Captain, Ship, Arrival } from '../types';

const captains: Captain[] = [
  {
    name: 'Bob',
    age: 63,
  },
  {
    name: 'Charles',
    age: 58,
  },
];

const ships: Ship[] = [
  {
    name: 'Wonderful boat',
  },
  {
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
    captains: (): Captain[] => captains,
    arrivals: (): Arrival[] => arrivals,
  },
};
