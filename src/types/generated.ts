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
  ship?: Maybe<Ship>;
  captain?: Maybe<Captain>;
  port?: Maybe<Port>;
  arrivalTime?: Maybe<Scalars['Date']>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}

export type Captain = {
  __typename?: 'Captain';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type Port = {
  __typename?: 'Port';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  ships?: Maybe<Array<Maybe<Ship>>>;
  captains?: Maybe<Array<Maybe<Captain>>>;
  arrivals?: Maybe<Array<Maybe<Arrival>>>;
};

export type Ship = {
  __typename?: 'Ship';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};
