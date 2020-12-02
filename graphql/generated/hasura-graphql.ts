import { GraphQLClient } from 'graphql-request';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  _nlike?: Maybe<Scalars['String']>;
  _nsimilar?: Maybe<Scalars['String']>;
  _similar?: Maybe<Scalars['String']>;
};

/** columns and relationships of "friends" */
export type Friends = {
  __typename?: 'friends';
  friend_id: Scalars['String'];
  /** An object relationship */
  user: Users;
  /** An object relationship */
  userByUserId: Users;
  user_id: Scalars['String'];
};

/** aggregated selection of "friends" */
export type Friends_Aggregate = {
  __typename?: 'friends_aggregate';
  aggregate?: Maybe<Friends_Aggregate_Fields>;
  nodes: Array<Friends>;
};

/** aggregate fields of "friends" */
export type Friends_Aggregate_Fields = {
  __typename?: 'friends_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Friends_Max_Fields>;
  min?: Maybe<Friends_Min_Fields>;
};


/** aggregate fields of "friends" */
export type Friends_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Friends_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "friends" */
export type Friends_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Friends_Max_Order_By>;
  min?: Maybe<Friends_Min_Order_By>;
};

/** input type for inserting array relation for remote table "friends" */
export type Friends_Arr_Rel_Insert_Input = {
  data: Array<Friends_Insert_Input>;
  on_conflict?: Maybe<Friends_On_Conflict>;
};

/** Boolean expression to filter rows from the table "friends". All fields are combined with a logical 'AND'. */
export type Friends_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Friends_Bool_Exp>>>;
  _not?: Maybe<Friends_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Friends_Bool_Exp>>>;
  friend_id?: Maybe<String_Comparison_Exp>;
  user?: Maybe<Users_Bool_Exp>;
  userByUserId?: Maybe<Users_Bool_Exp>;
  user_id?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "friends" */
export enum Friends_Constraint {
  /** unique or primary key constraint */
  FriendsPkey = 'friends_pkey'
}

/** input type for inserting data into table "friends" */
export type Friends_Insert_Input = {
  friend_id?: Maybe<Scalars['String']>;
  user?: Maybe<Users_Obj_Rel_Insert_Input>;
  userByUserId?: Maybe<Users_Obj_Rel_Insert_Input>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Friends_Max_Fields = {
  __typename?: 'friends_max_fields';
  friend_id?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "friends" */
export type Friends_Max_Order_By = {
  friend_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Friends_Min_Fields = {
  __typename?: 'friends_min_fields';
  friend_id?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "friends" */
export type Friends_Min_Order_By = {
  friend_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "friends" */
export type Friends_Mutation_Response = {
  __typename?: 'friends_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Friends>;
};

/** input type for inserting object relation for remote table "friends" */
export type Friends_Obj_Rel_Insert_Input = {
  data: Friends_Insert_Input;
  on_conflict?: Maybe<Friends_On_Conflict>;
};

/** on conflict condition type for table "friends" */
export type Friends_On_Conflict = {
  constraint: Friends_Constraint;
  update_columns: Array<Friends_Update_Column>;
  where?: Maybe<Friends_Bool_Exp>;
};

/** ordering options when selecting data from "friends" */
export type Friends_Order_By = {
  friend_id?: Maybe<Order_By>;
  user?: Maybe<Users_Order_By>;
  userByUserId?: Maybe<Users_Order_By>;
  user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "friends" */
export type Friends_Pk_Columns_Input = {
  friend_id: Scalars['String'];
  user_id: Scalars['String'];
};

/** select columns of table "friends" */
export enum Friends_Select_Column {
  /** column name */
  FriendId = 'friend_id',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "friends" */
export type Friends_Set_Input = {
  friend_id?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['String']>;
};

/** update columns of table "friends" */
export enum Friends_Update_Column {
  /** column name */
  FriendId = 'friend_id',
  /** column name */
  UserId = 'user_id'
}

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "friends" */
  delete_friends?: Maybe<Friends_Mutation_Response>;
  /** delete single row from the table: "friends" */
  delete_friends_by_pk?: Maybe<Friends>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  /** insert data into the table: "friends" */
  insert_friends?: Maybe<Friends_Mutation_Response>;
  /** insert a single row into the table: "friends" */
  insert_friends_one?: Maybe<Friends>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  /** update data of the table: "friends" */
  update_friends?: Maybe<Friends_Mutation_Response>;
  /** update single row of the table: "friends" */
  update_friends_by_pk?: Maybe<Friends>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
};


/** mutation root */
export type Mutation_RootDelete_FriendsArgs = {
  where: Friends_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Friends_By_PkArgs = {
  friend_id: Scalars['String'];
  user_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootInsert_FriendsArgs = {
  objects: Array<Friends_Insert_Input>;
  on_conflict?: Maybe<Friends_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Friends_OneArgs = {
  object: Friends_Insert_Input;
  on_conflict?: Maybe<Friends_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: Maybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict?: Maybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_FriendsArgs = {
  _set?: Maybe<Friends_Set_Input>;
  where: Friends_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Friends_By_PkArgs = {
  _set?: Maybe<Friends_Set_Input>;
  pk_columns: Friends_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _set?: Maybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _set?: Maybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};

/** column ordering options */
export enum Order_By {
  /** in the ascending order, nulls last */
  Asc = 'asc',
  /** in the ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in the ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in the descending order, nulls first */
  Desc = 'desc',
  /** in the descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in the descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** query root */
export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "friends" */
  friends: Array<Friends>;
  /** fetch aggregated fields from the table: "friends" */
  friends_aggregate: Friends_Aggregate;
  /** fetch data from the table: "friends" using primary key columns */
  friends_by_pk?: Maybe<Friends>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


/** query root */
export type Query_RootFriendsArgs = {
  distinct_on?: Maybe<Array<Friends_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Friends_Order_By>>;
  where?: Maybe<Friends_Bool_Exp>;
};


/** query root */
export type Query_RootFriends_AggregateArgs = {
  distinct_on?: Maybe<Array<Friends_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Friends_Order_By>>;
  where?: Maybe<Friends_Bool_Exp>;
};


/** query root */
export type Query_RootFriends_By_PkArgs = {
  friend_id: Scalars['String'];
  user_id: Scalars['String'];
};


/** query root */
export type Query_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


/** query root */
export type Query_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


/** query root */
export type Query_RootUsers_By_PkArgs = {
  id: Scalars['String'];
};

/** subscription root */
export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "friends" */
  friends: Array<Friends>;
  /** fetch aggregated fields from the table: "friends" */
  friends_aggregate: Friends_Aggregate;
  /** fetch data from the table: "friends" using primary key columns */
  friends_by_pk?: Maybe<Friends>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


/** subscription root */
export type Subscription_RootFriendsArgs = {
  distinct_on?: Maybe<Array<Friends_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Friends_Order_By>>;
  where?: Maybe<Friends_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootFriends_AggregateArgs = {
  distinct_on?: Maybe<Array<Friends_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Friends_Order_By>>;
  where?: Maybe<Friends_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootFriends_By_PkArgs = {
  friend_id: Scalars['String'];
  user_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['String'];
};

/**
 * Users synced from Auth0
 * 
 * 
 * columns and relationships of "users"
 */
export type Users = {
  __typename?: 'users';
  email: Scalars['String'];
  /** An array relationship */
  friends: Array<Friends>;
  /** An array relationship */
  friendsByFriendId: Array<Friends>;
  /** An aggregated array relationship */
  friendsByFriendId_aggregate: Friends_Aggregate;
  /** An aggregated array relationship */
  friends_aggregate: Friends_Aggregate;
  id: Scalars['String'];
  locale: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
};


/**
 * Users synced from Auth0
 * 
 * 
 * columns and relationships of "users"
 */
export type UsersFriendsArgs = {
  distinct_on?: Maybe<Array<Friends_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Friends_Order_By>>;
  where?: Maybe<Friends_Bool_Exp>;
};


/**
 * Users synced from Auth0
 * 
 * 
 * columns and relationships of "users"
 */
export type UsersFriendsByFriendIdArgs = {
  distinct_on?: Maybe<Array<Friends_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Friends_Order_By>>;
  where?: Maybe<Friends_Bool_Exp>;
};


/**
 * Users synced from Auth0
 * 
 * 
 * columns and relationships of "users"
 */
export type UsersFriendsByFriendId_AggregateArgs = {
  distinct_on?: Maybe<Array<Friends_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Friends_Order_By>>;
  where?: Maybe<Friends_Bool_Exp>;
};


/**
 * Users synced from Auth0
 * 
 * 
 * columns and relationships of "users"
 */
export type UsersFriends_AggregateArgs = {
  distinct_on?: Maybe<Array<Friends_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Friends_Order_By>>;
  where?: Maybe<Friends_Bool_Exp>;
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
};


/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Users_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "users" */
export type Users_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Users_Max_Order_By>;
  min?: Maybe<Users_Min_Order_By>;
};

/** input type for inserting array relation for remote table "users" */
export type Users_Arr_Rel_Insert_Input = {
  data: Array<Users_Insert_Input>;
  on_conflict?: Maybe<Users_On_Conflict>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Users_Bool_Exp>>>;
  _not?: Maybe<Users_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Users_Bool_Exp>>>;
  email?: Maybe<String_Comparison_Exp>;
  friends?: Maybe<Friends_Bool_Exp>;
  friendsByFriendId?: Maybe<Friends_Bool_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  locale?: Maybe<String_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  picture?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint */
  UsersEmailKey = 'users_email_key',
  /** unique or primary key constraint */
  UsersPkey = 'users_pkey'
}

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  email?: Maybe<Scalars['String']>;
  friends?: Maybe<Friends_Arr_Rel_Insert_Input>;
  friendsByFriendId?: Maybe<Friends_Arr_Rel_Insert_Input>;
  id?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "users" */
export type Users_Max_Order_By = {
  email?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  locale?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  picture?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "users" */
export type Users_Min_Order_By = {
  email?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  locale?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  picture?: Maybe<Order_By>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  on_conflict?: Maybe<Users_On_Conflict>;
};

/** on conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns: Array<Users_Update_Column>;
  where?: Maybe<Users_Bool_Exp>;
};

/** ordering options when selecting data from "users" */
export type Users_Order_By = {
  email?: Maybe<Order_By>;
  friendsByFriendId_aggregate?: Maybe<Friends_Aggregate_Order_By>;
  friends_aggregate?: Maybe<Friends_Aggregate_Order_By>;
  id?: Maybe<Order_By>;
  locale?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  picture?: Maybe<Order_By>;
};

/** primary key columns input for table: "users" */
export type Users_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Locale = 'locale',
  /** column name */
  Name = 'name',
  /** column name */
  Picture = 'picture'
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
};

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Locale = 'locale',
  /** column name */
  Name = 'name',
  /** column name */
  Picture = 'picture'
}

export type UserBaseFragment = (
  { __typename?: 'users' }
  & Pick<Users, 'id' | 'name' | 'picture'>
);

export type UserCompleteFragment = (
  { __typename?: 'users' }
  & Pick<Users, 'email' | 'locale'>
  & UserBaseFragment
);

export type UserFragment = (
  { __typename?: 'users' }
  & Pick<Users, 'email' | 'locale'>
  & UserBaseFragment
);

export type FriendCountAndIdsFragment = (
  { __typename?: 'users' }
  & { friends_aggregate: (
    { __typename?: 'friends_aggregate' }
    & { aggregate?: Maybe<(
      { __typename?: 'friends_aggregate_fields' }
      & Pick<Friends_Aggregate_Fields, 'count'>
    )>, nodes: Array<(
      { __typename?: 'friends' }
      & Pick<Friends, 'friend_id'>
    )> }
  ) }
);

export type WithFriendsFragment = (
  { __typename?: 'users' }
  & { friends: Array<(
    { __typename?: 'friends' }
    & Pick<Friends, 'friend_id'>
    & { user: (
      { __typename?: 'users' }
      & UserBaseFragment
    ) }
  )> }
);

export type UserWithFriendIdsFragment = (
  { __typename?: 'users' }
  & UserBaseFragment
  & FriendCountAndIdsFragment
);

export type InsertUserMutationVariables = Exact<{
  user_id: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  picture: Scalars['String'];
  locale: Scalars['String'];
}>;


export type InsertUserMutation = (
  { __typename?: 'mutation_root' }
  & { insert_users_one?: Maybe<(
    { __typename?: 'users' }
    & UserCompleteFragment
  )> }
);

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = (
  { __typename?: 'query_root' }
  & { users: Array<(
    { __typename?: 'users' }
    & UserFragment
  )> }
);

export type UserByPkQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type UserByPkQuery = (
  { __typename?: 'query_root' }
  & { users_by_pk?: Maybe<(
    { __typename?: 'users' }
    & UserFragment
  )> }
);

export type UserByEmailQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type UserByEmailQuery = (
  { __typename?: 'query_root' }
  & { users: Array<(
    { __typename?: 'users' }
    & UserFragment
  )> }
);

export type FriendsQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type FriendsQuery = (
  { __typename?: 'query_root' }
  & { users: Array<(
    { __typename?: 'users' }
    & UserBaseFragment
  )> }
);

export const UserBaseFragmentDoc = gql`
    fragment UserBase on users {
  id
  name
  picture
}
    `;
export const UserCompleteFragmentDoc = gql`
    fragment UserComplete on users {
  ...UserBase
  email
  locale
}
    ${UserBaseFragmentDoc}`;
export const UserFragmentDoc = gql`
    fragment User on users {
  ...UserBase
  email
  locale
}
    ${UserBaseFragmentDoc}`;
export const WithFriendsFragmentDoc = gql`
    fragment WithFriends on users {
  friends {
    friend_id
    user {
      ...UserBase
    }
  }
}
    ${UserBaseFragmentDoc}`;
export const FriendCountAndIdsFragmentDoc = gql`
    fragment FriendCountAndIds on users {
  friends_aggregate {
    aggregate {
      count
    }
    nodes {
      friend_id
    }
  }
}
    `;
export const UserWithFriendIdsFragmentDoc = gql`
    fragment UserWithFriendIds on users {
  ...UserBase
  ...FriendCountAndIds
}
    ${UserBaseFragmentDoc}
${FriendCountAndIdsFragmentDoc}`;
export const InsertUserDocument = gql`
    mutation InsertUser($user_id: String!, $email: String!, $name: String!, $picture: String!, $locale: String!) {
  insert_users_one(object: {email: $email, id: $user_id, name: $name, picture: $picture, locale: $locale}, on_conflict: {constraint: users_pkey, update_columns: [name, picture, locale]}) {
    ...UserComplete
  }
}
    ${UserCompleteFragmentDoc}`;
export const UsersDocument = gql`
    query Users {
  users {
    ...User
  }
}
    ${UserFragmentDoc}`;
export const UserByPkDocument = gql`
    query UserByPk($id: String!) {
  users_by_pk(id: $id) {
    ...User
  }
}
    ${UserFragmentDoc}`;
export const UserByEmailDocument = gql`
    query UserByEmail($email: String!) {
  users(where: {email: {_eq: $email}}) {
    ...User
  }
}
    ${UserFragmentDoc}`;
export const FriendsDocument = gql`
    query Friends($userId: String!) {
  users(where: {friends: {friend_id: {_eq: $userId}}}) {
    ...UserBase
  }
}
    ${UserBaseFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    InsertUser(variables: InsertUserMutationVariables): Promise<InsertUserMutation> {
      return withWrapper(() => client.request<InsertUserMutation>(print(InsertUserDocument), variables));
    },
    Users(variables?: UsersQueryVariables): Promise<UsersQuery> {
      return withWrapper(() => client.request<UsersQuery>(print(UsersDocument), variables));
    },
    UserByPk(variables: UserByPkQueryVariables): Promise<UserByPkQuery> {
      return withWrapper(() => client.request<UserByPkQuery>(print(UserByPkDocument), variables));
    },
    UserByEmail(variables: UserByEmailQueryVariables): Promise<UserByEmailQuery> {
      return withWrapper(() => client.request<UserByEmailQuery>(print(UserByEmailDocument), variables));
    },
    Friends(variables: FriendsQueryVariables): Promise<FriendsQuery> {
      return withWrapper(() => client.request<FriendsQuery>(print(FriendsDocument), variables));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;