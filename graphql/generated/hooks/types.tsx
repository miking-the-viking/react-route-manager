import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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

/** columns and relationships of "followers" */
export type Followers = {
  __typename?: 'followers';
  follower_id: Scalars['String'];
  /** An object relationship */
  followers: Users;
  /** An object relationship */
  following: Users;
  user_id: Scalars['String'];
};

/** aggregated selection of "followers" */
export type Followers_Aggregate = {
  __typename?: 'followers_aggregate';
  aggregate?: Maybe<Followers_Aggregate_Fields>;
  nodes: Array<Followers>;
};

/** aggregate fields of "followers" */
export type Followers_Aggregate_Fields = {
  __typename?: 'followers_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Followers_Max_Fields>;
  min?: Maybe<Followers_Min_Fields>;
};


/** aggregate fields of "followers" */
export type Followers_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Followers_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "followers" */
export type Followers_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Followers_Max_Order_By>;
  min?: Maybe<Followers_Min_Order_By>;
};

/** input type for inserting array relation for remote table "followers" */
export type Followers_Arr_Rel_Insert_Input = {
  data: Array<Followers_Insert_Input>;
  on_conflict?: Maybe<Followers_On_Conflict>;
};

/** Boolean expression to filter rows from the table "followers". All fields are combined with a logical 'AND'. */
export type Followers_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Followers_Bool_Exp>>>;
  _not?: Maybe<Followers_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Followers_Bool_Exp>>>;
  follower_id?: Maybe<String_Comparison_Exp>;
  followers?: Maybe<Users_Bool_Exp>;
  following?: Maybe<Users_Bool_Exp>;
  user_id?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "followers" */
export enum Followers_Constraint {
  /** unique or primary key constraint */
  FollowersPkey = 'followers_pkey'
}

/** input type for inserting data into table "followers" */
export type Followers_Insert_Input = {
  follower_id?: Maybe<Scalars['String']>;
  followers?: Maybe<Users_Obj_Rel_Insert_Input>;
  following?: Maybe<Users_Obj_Rel_Insert_Input>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Followers_Max_Fields = {
  __typename?: 'followers_max_fields';
  follower_id?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "followers" */
export type Followers_Max_Order_By = {
  follower_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Followers_Min_Fields = {
  __typename?: 'followers_min_fields';
  follower_id?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "followers" */
export type Followers_Min_Order_By = {
  follower_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "followers" */
export type Followers_Mutation_Response = {
  __typename?: 'followers_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Followers>;
};

/** input type for inserting object relation for remote table "followers" */
export type Followers_Obj_Rel_Insert_Input = {
  data: Followers_Insert_Input;
  on_conflict?: Maybe<Followers_On_Conflict>;
};

/** on conflict condition type for table "followers" */
export type Followers_On_Conflict = {
  constraint: Followers_Constraint;
  update_columns: Array<Followers_Update_Column>;
  where?: Maybe<Followers_Bool_Exp>;
};

/** ordering options when selecting data from "followers" */
export type Followers_Order_By = {
  follower_id?: Maybe<Order_By>;
  followers?: Maybe<Users_Order_By>;
  following?: Maybe<Users_Order_By>;
  user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "followers" */
export type Followers_Pk_Columns_Input = {
  follower_id: Scalars['String'];
  user_id: Scalars['String'];
};

/** select columns of table "followers" */
export enum Followers_Select_Column {
  /** column name */
  FollowerId = 'follower_id',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "followers" */
export type Followers_Set_Input = {
  follower_id?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['String']>;
};

/** update columns of table "followers" */
export enum Followers_Update_Column {
  /** column name */
  FollowerId = 'follower_id',
  /** column name */
  UserId = 'user_id'
}

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "followers" */
  delete_followers?: Maybe<Followers_Mutation_Response>;
  /** delete single row from the table: "followers" */
  delete_followers_by_pk?: Maybe<Followers>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  /** insert data into the table: "followers" */
  insert_followers?: Maybe<Followers_Mutation_Response>;
  /** insert a single row into the table: "followers" */
  insert_followers_one?: Maybe<Followers>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  /** update data of the table: "followers" */
  update_followers?: Maybe<Followers_Mutation_Response>;
  /** update single row of the table: "followers" */
  update_followers_by_pk?: Maybe<Followers>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
};


/** mutation root */
export type Mutation_RootDelete_FollowersArgs = {
  where: Followers_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Followers_By_PkArgs = {
  follower_id: Scalars['String'];
  user_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  email: Scalars['String'];
};


/** mutation root */
export type Mutation_RootInsert_FollowersArgs = {
  objects: Array<Followers_Insert_Input>;
  on_conflict?: Maybe<Followers_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Followers_OneArgs = {
  object: Followers_Insert_Input;
  on_conflict?: Maybe<Followers_On_Conflict>;
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
export type Mutation_RootUpdate_FollowersArgs = {
  _set?: Maybe<Followers_Set_Input>;
  where: Followers_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Followers_By_PkArgs = {
  _set?: Maybe<Followers_Set_Input>;
  pk_columns: Followers_Pk_Columns_Input;
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
  /** fetch data from the table: "followers" */
  followers: Array<Followers>;
  /** fetch aggregated fields from the table: "followers" */
  followers_aggregate: Followers_Aggregate;
  /** fetch data from the table: "followers" using primary key columns */
  followers_by_pk?: Maybe<Followers>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


/** query root */
export type Query_RootFollowersArgs = {
  distinct_on?: Maybe<Array<Followers_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Followers_Order_By>>;
  where?: Maybe<Followers_Bool_Exp>;
};


/** query root */
export type Query_RootFollowers_AggregateArgs = {
  distinct_on?: Maybe<Array<Followers_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Followers_Order_By>>;
  where?: Maybe<Followers_Bool_Exp>;
};


/** query root */
export type Query_RootFollowers_By_PkArgs = {
  follower_id: Scalars['String'];
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
  email: Scalars['String'];
};

/** subscription root */
export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "followers" */
  followers: Array<Followers>;
  /** fetch aggregated fields from the table: "followers" */
  followers_aggregate: Followers_Aggregate;
  /** fetch data from the table: "followers" using primary key columns */
  followers_by_pk?: Maybe<Followers>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


/** subscription root */
export type Subscription_RootFollowersArgs = {
  distinct_on?: Maybe<Array<Followers_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Followers_Order_By>>;
  where?: Maybe<Followers_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootFollowers_AggregateArgs = {
  distinct_on?: Maybe<Array<Followers_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Followers_Order_By>>;
  where?: Maybe<Followers_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootFollowers_By_PkArgs = {
  follower_id: Scalars['String'];
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
  email: Scalars['String'];
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
  followers: Array<Followers>;
  /** An aggregated array relationship */
  followers_aggregate: Followers_Aggregate;
  /** An array relationship */
  following: Array<Followers>;
  /** An aggregated array relationship */
  following_aggregate: Followers_Aggregate;
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
export type UsersFollowersArgs = {
  distinct_on?: Maybe<Array<Followers_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Followers_Order_By>>;
  where?: Maybe<Followers_Bool_Exp>;
};


/**
 * Users synced from Auth0
 * 
 * 
 * columns and relationships of "users"
 */
export type UsersFollowers_AggregateArgs = {
  distinct_on?: Maybe<Array<Followers_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Followers_Order_By>>;
  where?: Maybe<Followers_Bool_Exp>;
};


/**
 * Users synced from Auth0
 * 
 * 
 * columns and relationships of "users"
 */
export type UsersFollowingArgs = {
  distinct_on?: Maybe<Array<Followers_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Followers_Order_By>>;
  where?: Maybe<Followers_Bool_Exp>;
};


/**
 * Users synced from Auth0
 * 
 * 
 * columns and relationships of "users"
 */
export type UsersFollowing_AggregateArgs = {
  distinct_on?: Maybe<Array<Followers_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Followers_Order_By>>;
  where?: Maybe<Followers_Bool_Exp>;
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
  followers?: Maybe<Followers_Bool_Exp>;
  following?: Maybe<Followers_Bool_Exp>;
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
  UsersIdKey = 'users_id_key',
  /** unique or primary key constraint */
  UsersPkey = 'users_pkey'
}

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  email?: Maybe<Scalars['String']>;
  followers?: Maybe<Followers_Arr_Rel_Insert_Input>;
  following?: Maybe<Followers_Arr_Rel_Insert_Input>;
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
  followers_aggregate?: Maybe<Followers_Aggregate_Order_By>;
  following_aggregate?: Maybe<Followers_Aggregate_Order_By>;
  id?: Maybe<Order_By>;
  locale?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  picture?: Maybe<Order_By>;
};

/** primary key columns input for table: "users" */
export type Users_Pk_Columns_Input = {
  email: Scalars['String'];
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
  & { followers_aggregate: (
    { __typename?: 'followers_aggregate' }
    & { aggregate?: Maybe<(
      { __typename?: 'followers_aggregate_fields' }
      & Pick<Followers_Aggregate_Fields, 'count'>
    )> }
  ), following_aggregate: (
    { __typename?: 'followers_aggregate' }
    & { aggregate?: Maybe<(
      { __typename?: 'followers_aggregate_fields' }
      & Pick<Followers_Aggregate_Fields, 'count'>
    )> }
  ) }
  & UserBaseFragment
);

export type UserFragment = (
  { __typename?: 'users' }
  & Pick<Users, 'email' | 'locale'>
  & UserBaseFragment
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

export type FollowUserMutationVariables = Exact<{
  userId: Scalars['String'];
  followerId: Scalars['String'];
}>;


export type FollowUserMutation = (
  { __typename?: 'mutation_root' }
  & { insert_followers_one?: Maybe<(
    { __typename?: 'followers' }
    & Pick<Followers, 'follower_id' | 'user_id'>
  )> }
);

export type UnfollowUserMutationVariables = Exact<{
  userId: Scalars['String'];
  followerId: Scalars['String'];
}>;


export type UnfollowUserMutation = (
  { __typename?: 'mutation_root' }
  & { delete_followers?: Maybe<(
    { __typename?: 'followers_mutation_response' }
    & Pick<Followers_Mutation_Response, 'affected_rows'>
    & { returning: Array<(
      { __typename?: 'followers' }
      & Pick<Followers, 'follower_id' | 'user_id'>
    )> }
  )> }
);

export type OtherUsersQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type OtherUsersQuery = (
  { __typename?: 'query_root' }
  & { users: Array<(
    { __typename?: 'users' }
    & UserCompleteFragment
  )> }
);

export type UserByPkQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type UserByPkQuery = (
  { __typename?: 'query_root' }
  & { users_by_pk?: Maybe<(
    { __typename?: 'users' }
    & UserFragment
  )> }
);

export type UserByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type UserByIdQuery = (
  { __typename?: 'query_root' }
  & { users: Array<(
    { __typename?: 'users' }
    & UserFragment
  )> }
);

export type UserFollowersQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type UserFollowersQuery = (
  { __typename?: 'query_root' }
  & { users: Array<(
    { __typename?: 'users' }
    & UserCompleteFragment
  )> }
);

export type UserFollowingQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type UserFollowingQuery = (
  { __typename?: 'query_root' }
  & { followers: Array<(
    { __typename?: 'followers' }
    & { following: (
      { __typename?: 'users' }
      & UserCompleteFragment
    ) }
  )> }
);

export type WhoImFollowingSubscriptionVariables = Exact<{
  followerId: Scalars['String'];
}>;


export type WhoImFollowingSubscription = (
  { __typename?: 'subscription_root' }
  & { followers: Array<(
    { __typename?: 'followers' }
    & { following: (
      { __typename?: 'users' }
      & UserCompleteFragment
    ) }
  )> }
);

export type WhosFollowingMeSubscriptionVariables = Exact<{
  myId: Scalars['String'];
}>;


export type WhosFollowingMeSubscription = (
  { __typename?: 'subscription_root' }
  & { followers: Array<(
    { __typename?: 'followers' }
    & { following: (
      { __typename?: 'users' }
      & UserCompleteFragment
    ) }
  )> }
);

export type FollowableUsersSubscriptionVariables = Exact<{
  userId: Scalars['String'];
  followedUserIds: Array<Scalars['String']>;
}>;


export type FollowableUsersSubscription = (
  { __typename?: 'subscription_root' }
  & { users: Array<(
    { __typename?: 'users' }
    & UserCompleteFragment
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
  followers_aggregate {
    aggregate {
      count
    }
  }
  following_aggregate {
    aggregate {
      count
    }
  }
}
    ${UserBaseFragmentDoc}`;
export const UserFragmentDoc = gql`
    fragment User on users {
  ...UserBase
  email
  locale
}
    ${UserBaseFragmentDoc}`;
export const InsertUserDocument = gql`
    mutation InsertUser($user_id: String!, $email: String!, $name: String!, $picture: String!, $locale: String!) {
  insert_users_one(
    object: {email: $email, id: $user_id, name: $name, picture: $picture, locale: $locale}
    on_conflict: {constraint: users_pkey, update_columns: [name, picture, locale]}
  ) {
    ...UserComplete
  }
}
    ${UserCompleteFragmentDoc}`;
export type InsertUserMutationFn = Apollo.MutationFunction<InsertUserMutation, InsertUserMutationVariables>;

/**
 * __useInsertUserMutation__
 *
 * To run a mutation, you first call `useInsertUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertUserMutation, { data, loading, error }] = useInsertUserMutation({
 *   variables: {
 *      user_id: // value for 'user_id'
 *      email: // value for 'email'
 *      name: // value for 'name'
 *      picture: // value for 'picture'
 *      locale: // value for 'locale'
 *   },
 * });
 */
export function useInsertUserMutation(baseOptions?: Apollo.MutationHookOptions<InsertUserMutation, InsertUserMutationVariables>) {
        return Apollo.useMutation<InsertUserMutation, InsertUserMutationVariables>(InsertUserDocument, baseOptions);
      }
export type InsertUserMutationHookResult = ReturnType<typeof useInsertUserMutation>;
export type InsertUserMutationResult = Apollo.MutationResult<InsertUserMutation>;
export type InsertUserMutationOptions = Apollo.BaseMutationOptions<InsertUserMutation, InsertUserMutationVariables>;
export const FollowUserDocument = gql`
    mutation FollowUser($userId: String!, $followerId: String!) {
  insert_followers_one(object: {user_id: $userId, follower_id: $followerId}) {
    follower_id
    user_id
  }
}
    `;
export type FollowUserMutationFn = Apollo.MutationFunction<FollowUserMutation, FollowUserMutationVariables>;

/**
 * __useFollowUserMutation__
 *
 * To run a mutation, you first call `useFollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followUserMutation, { data, loading, error }] = useFollowUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      followerId: // value for 'followerId'
 *   },
 * });
 */
export function useFollowUserMutation(baseOptions?: Apollo.MutationHookOptions<FollowUserMutation, FollowUserMutationVariables>) {
        return Apollo.useMutation<FollowUserMutation, FollowUserMutationVariables>(FollowUserDocument, baseOptions);
      }
export type FollowUserMutationHookResult = ReturnType<typeof useFollowUserMutation>;
export type FollowUserMutationResult = Apollo.MutationResult<FollowUserMutation>;
export type FollowUserMutationOptions = Apollo.BaseMutationOptions<FollowUserMutation, FollowUserMutationVariables>;
export const UnfollowUserDocument = gql`
    mutation UnfollowUser($userId: String!, $followerId: String!) {
  delete_followers(
    where: {_and: [{user_id: {_eq: $userId}}, {follower_id: {_eq: $followerId}}]}
  ) {
    affected_rows
    returning {
      follower_id
      user_id
    }
  }
}
    `;
export type UnfollowUserMutationFn = Apollo.MutationFunction<UnfollowUserMutation, UnfollowUserMutationVariables>;

/**
 * __useUnfollowUserMutation__
 *
 * To run a mutation, you first call `useUnfollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnfollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unfollowUserMutation, { data, loading, error }] = useUnfollowUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      followerId: // value for 'followerId'
 *   },
 * });
 */
export function useUnfollowUserMutation(baseOptions?: Apollo.MutationHookOptions<UnfollowUserMutation, UnfollowUserMutationVariables>) {
        return Apollo.useMutation<UnfollowUserMutation, UnfollowUserMutationVariables>(UnfollowUserDocument, baseOptions);
      }
export type UnfollowUserMutationHookResult = ReturnType<typeof useUnfollowUserMutation>;
export type UnfollowUserMutationResult = Apollo.MutationResult<UnfollowUserMutation>;
export type UnfollowUserMutationOptions = Apollo.BaseMutationOptions<UnfollowUserMutation, UnfollowUserMutationVariables>;
export const OtherUsersDocument = gql`
    query OtherUsers($userId: String!) {
  users(where: {id: {_neq: $userId}}) {
    ...UserComplete
  }
}
    ${UserCompleteFragmentDoc}`;

/**
 * __useOtherUsersQuery__
 *
 * To run a query within a React component, call `useOtherUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useOtherUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOtherUsersQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useOtherUsersQuery(baseOptions: Apollo.QueryHookOptions<OtherUsersQuery, OtherUsersQueryVariables>) {
        return Apollo.useQuery<OtherUsersQuery, OtherUsersQueryVariables>(OtherUsersDocument, baseOptions);
      }
export function useOtherUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OtherUsersQuery, OtherUsersQueryVariables>) {
          return Apollo.useLazyQuery<OtherUsersQuery, OtherUsersQueryVariables>(OtherUsersDocument, baseOptions);
        }
export type OtherUsersQueryHookResult = ReturnType<typeof useOtherUsersQuery>;
export type OtherUsersLazyQueryHookResult = ReturnType<typeof useOtherUsersLazyQuery>;
export type OtherUsersQueryResult = Apollo.QueryResult<OtherUsersQuery, OtherUsersQueryVariables>;
export const UserByPkDocument = gql`
    query UserByPk($email: String!) {
  users_by_pk(email: $email) {
    ...User
  }
}
    ${UserFragmentDoc}`;

/**
 * __useUserByPkQuery__
 *
 * To run a query within a React component, call `useUserByPkQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserByPkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserByPkQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useUserByPkQuery(baseOptions: Apollo.QueryHookOptions<UserByPkQuery, UserByPkQueryVariables>) {
        return Apollo.useQuery<UserByPkQuery, UserByPkQueryVariables>(UserByPkDocument, baseOptions);
      }
export function useUserByPkLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserByPkQuery, UserByPkQueryVariables>) {
          return Apollo.useLazyQuery<UserByPkQuery, UserByPkQueryVariables>(UserByPkDocument, baseOptions);
        }
export type UserByPkQueryHookResult = ReturnType<typeof useUserByPkQuery>;
export type UserByPkLazyQueryHookResult = ReturnType<typeof useUserByPkLazyQuery>;
export type UserByPkQueryResult = Apollo.QueryResult<UserByPkQuery, UserByPkQueryVariables>;
export const UserByIdDocument = gql`
    query UserById($id: String!) {
  users(where: {id: {_eq: $id}}) {
    ...User
  }
}
    ${UserFragmentDoc}`;

/**
 * __useUserByIdQuery__
 *
 * To run a query within a React component, call `useUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserByIdQuery(baseOptions: Apollo.QueryHookOptions<UserByIdQuery, UserByIdQueryVariables>) {
        return Apollo.useQuery<UserByIdQuery, UserByIdQueryVariables>(UserByIdDocument, baseOptions);
      }
export function useUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserByIdQuery, UserByIdQueryVariables>) {
          return Apollo.useLazyQuery<UserByIdQuery, UserByIdQueryVariables>(UserByIdDocument, baseOptions);
        }
export type UserByIdQueryHookResult = ReturnType<typeof useUserByIdQuery>;
export type UserByIdLazyQueryHookResult = ReturnType<typeof useUserByIdLazyQuery>;
export type UserByIdQueryResult = Apollo.QueryResult<UserByIdQuery, UserByIdQueryVariables>;
export const UserFollowersDocument = gql`
    query UserFollowers($userId: String!) {
  users(where: {following: {user_id: {_eq: $userId}}}) {
    ...UserComplete
  }
}
    ${UserCompleteFragmentDoc}`;

/**
 * __useUserFollowersQuery__
 *
 * To run a query within a React component, call `useUserFollowersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserFollowersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserFollowersQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserFollowersQuery(baseOptions: Apollo.QueryHookOptions<UserFollowersQuery, UserFollowersQueryVariables>) {
        return Apollo.useQuery<UserFollowersQuery, UserFollowersQueryVariables>(UserFollowersDocument, baseOptions);
      }
export function useUserFollowersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserFollowersQuery, UserFollowersQueryVariables>) {
          return Apollo.useLazyQuery<UserFollowersQuery, UserFollowersQueryVariables>(UserFollowersDocument, baseOptions);
        }
export type UserFollowersQueryHookResult = ReturnType<typeof useUserFollowersQuery>;
export type UserFollowersLazyQueryHookResult = ReturnType<typeof useUserFollowersLazyQuery>;
export type UserFollowersQueryResult = Apollo.QueryResult<UserFollowersQuery, UserFollowersQueryVariables>;
export const UserFollowingDocument = gql`
    query UserFollowing($userId: String!) {
  followers(where: {follower_id: {_eq: $userId}}) {
    following {
      ...UserComplete
    }
  }
}
    ${UserCompleteFragmentDoc}`;

/**
 * __useUserFollowingQuery__
 *
 * To run a query within a React component, call `useUserFollowingQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserFollowingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserFollowingQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserFollowingQuery(baseOptions: Apollo.QueryHookOptions<UserFollowingQuery, UserFollowingQueryVariables>) {
        return Apollo.useQuery<UserFollowingQuery, UserFollowingQueryVariables>(UserFollowingDocument, baseOptions);
      }
export function useUserFollowingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserFollowingQuery, UserFollowingQueryVariables>) {
          return Apollo.useLazyQuery<UserFollowingQuery, UserFollowingQueryVariables>(UserFollowingDocument, baseOptions);
        }
export type UserFollowingQueryHookResult = ReturnType<typeof useUserFollowingQuery>;
export type UserFollowingLazyQueryHookResult = ReturnType<typeof useUserFollowingLazyQuery>;
export type UserFollowingQueryResult = Apollo.QueryResult<UserFollowingQuery, UserFollowingQueryVariables>;
export const WhoImFollowingDocument = gql`
    subscription WhoImFollowing($followerId: String!) {
  followers(where: {follower_id: {_eq: $followerId}}) {
    following {
      ...UserComplete
    }
  }
}
    ${UserCompleteFragmentDoc}`;

/**
 * __useWhoImFollowingSubscription__
 *
 * To run a query within a React component, call `useWhoImFollowingSubscription` and pass it any options that fit your needs.
 * When your component renders, `useWhoImFollowingSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWhoImFollowingSubscription({
 *   variables: {
 *      followerId: // value for 'followerId'
 *   },
 * });
 */
export function useWhoImFollowingSubscription(baseOptions: Apollo.SubscriptionHookOptions<WhoImFollowingSubscription, WhoImFollowingSubscriptionVariables>) {
        return Apollo.useSubscription<WhoImFollowingSubscription, WhoImFollowingSubscriptionVariables>(WhoImFollowingDocument, baseOptions);
      }
export type WhoImFollowingSubscriptionHookResult = ReturnType<typeof useWhoImFollowingSubscription>;
export type WhoImFollowingSubscriptionResult = Apollo.SubscriptionResult<WhoImFollowingSubscription>;
export const WhosFollowingMeDocument = gql`
    subscription WhosFollowingMe($myId: String!) {
  followers(where: {user_id: {_eq: $myId}}) {
    following {
      ...UserComplete
    }
  }
}
    ${UserCompleteFragmentDoc}`;

/**
 * __useWhosFollowingMeSubscription__
 *
 * To run a query within a React component, call `useWhosFollowingMeSubscription` and pass it any options that fit your needs.
 * When your component renders, `useWhosFollowingMeSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWhosFollowingMeSubscription({
 *   variables: {
 *      myId: // value for 'myId'
 *   },
 * });
 */
export function useWhosFollowingMeSubscription(baseOptions: Apollo.SubscriptionHookOptions<WhosFollowingMeSubscription, WhosFollowingMeSubscriptionVariables>) {
        return Apollo.useSubscription<WhosFollowingMeSubscription, WhosFollowingMeSubscriptionVariables>(WhosFollowingMeDocument, baseOptions);
      }
export type WhosFollowingMeSubscriptionHookResult = ReturnType<typeof useWhosFollowingMeSubscription>;
export type WhosFollowingMeSubscriptionResult = Apollo.SubscriptionResult<WhosFollowingMeSubscription>;
export const FollowableUsersDocument = gql`
    subscription FollowableUsers($userId: String!, $followedUserIds: [String!]!) {
  users(where: {_and: [{id: {_neq: $userId}}, {id: {_nin: $followedUserIds}}]}) {
    ...UserComplete
  }
}
    ${UserCompleteFragmentDoc}`;

/**
 * __useFollowableUsersSubscription__
 *
 * To run a query within a React component, call `useFollowableUsersSubscription` and pass it any options that fit your needs.
 * When your component renders, `useFollowableUsersSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFollowableUsersSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *      followedUserIds: // value for 'followedUserIds'
 *   },
 * });
 */
export function useFollowableUsersSubscription(baseOptions: Apollo.SubscriptionHookOptions<FollowableUsersSubscription, FollowableUsersSubscriptionVariables>) {
        return Apollo.useSubscription<FollowableUsersSubscription, FollowableUsersSubscriptionVariables>(FollowableUsersDocument, baseOptions);
      }
export type FollowableUsersSubscriptionHookResult = ReturnType<typeof useFollowableUsersSubscription>;
export type FollowableUsersSubscriptionResult = Apollo.SubscriptionResult<FollowableUsersSubscription>;