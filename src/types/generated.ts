export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Cursor: any;
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

export type ArrivalConnection = {
  __typename?: 'ArrivalConnection';
  edges?: Maybe<Array<Maybe<ArrivalEdge>>>;
  pageInfo: PageInfo;
};

export type ArrivalEdge = {
  __typename?: 'ArrivalEdge';
  node?: Maybe<Arrival>;
  cursor?: Maybe<Scalars['Cursor']>;
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

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage?: Maybe<Scalars['Boolean']>;
  endCursor?: Maybe<Scalars['Cursor']>;
};

export type PaginationInput = {
  first: Scalars['Int'];
  after?: Maybe<Scalars['Cursor']>;
};

export type Query = {
  __typename?: 'Query';
  getArrivals?: Maybe<ArrivalConnection>;
};

export type QueryGetArrivalsArgs = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  pagination: PaginationInput;
  sort?: Maybe<Sort>;
};

export enum Sort {
  Asc = 'ASC',
  Desc = 'DESC',
}
