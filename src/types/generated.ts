export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  Upload: any;
};

export type Arrival = {
  __typename?: 'Arrival';
  id: Scalars['ID'];
  vesselName: Scalars['String'];
  captainName: Scalars['String'];
  port: Scalars['String'];
  arrivedAt: Scalars['Date'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}

export type CreateArrivalInput = {
  captainName: Scalars['String'];
  vesselName: Scalars['String'];
  port: Scalars['String'];
  arrivedAt: Scalars['Date'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createArrival?: Maybe<Arrival>;
};

export type MutationCreateArrivalArgs = {
  input: CreateArrivalInput;
};

export type Query = {
  __typename?: 'Query';
  arrivals?: Maybe<Array<Maybe<Arrival>>>;
  getArrivals?: Maybe<Array<Maybe<Arrival>>>;
};

export type QueryGetArrivalsArgs = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  sort?: Maybe<Sort>;
};

export enum Sort {
  Asc = 'ASC',
  Desc = 'DESC',
}
