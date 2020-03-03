export type Captain = {
  name: string;
  age: number;
};

export type Ship = {
  name: string;
};

export type Arrival = {
  ship: Ship;
  captain: Captain;
  arrivalTime: Date;
};
