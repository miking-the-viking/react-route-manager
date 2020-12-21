import { GraphQLClient } from 'graphql-request';
import { print } from 'graphql';
import gql from 'graphql-tag';
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

/** columns and relationships of "followable_users" */
export type Followable_Users = {
  __typename?: 'followable_users';
  followable_id?: Maybe<Scalars['String']>;
  /** An array relationship */
  followable_users: Array<Users>;
  /** An aggregated array relationship */
  followable_users_aggregate: Users_Aggregate;
  /** An object relationship */
  user?: Maybe<Users>;
  user_id?: Maybe<Scalars['String']>;
};


/** columns and relationships of "followable_users" */
export type Followable_UsersFollowable_UsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


/** columns and relationships of "followable_users" */
export type Followable_UsersFollowable_Users_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};

/** aggregated selection of "followable_users" */
export type Followable_Users_Aggregate = {
  __typename?: 'followable_users_aggregate';
  aggregate?: Maybe<Followable_Users_Aggregate_Fields>;
  nodes: Array<Followable_Users>;
};

/** aggregate fields of "followable_users" */
export type Followable_Users_Aggregate_Fields = {
  __typename?: 'followable_users_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Followable_Users_Max_Fields>;
  min?: Maybe<Followable_Users_Min_Fields>;
};


/** aggregate fields of "followable_users" */
export type Followable_Users_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Followable_Users_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "followable_users" */
export type Followable_Users_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Followable_Users_Max_Order_By>;
  min?: Maybe<Followable_Users_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "followable_users". All fields are combined with a logical 'AND'. */
export type Followable_Users_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Followable_Users_Bool_Exp>>>;
  _not?: Maybe<Followable_Users_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Followable_Users_Bool_Exp>>>;
  followable_id?: Maybe<String_Comparison_Exp>;
  followable_users?: Maybe<Users_Bool_Exp>;
  user?: Maybe<Users_Bool_Exp>;
  user_id?: Maybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Followable_Users_Max_Fields = {
  __typename?: 'followable_users_max_fields';
  followable_id?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "followable_users" */
export type Followable_Users_Max_Order_By = {
  followable_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Followable_Users_Min_Fields = {
  __typename?: 'followable_users_min_fields';
  followable_id?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "followable_users" */
export type Followable_Users_Min_Order_By = {
  followable_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** ordering options when selecting data from "followable_users" */
export type Followable_Users_Order_By = {
  followable_id?: Maybe<Order_By>;
  followable_users_aggregate?: Maybe<Users_Aggregate_Order_By>;
  user?: Maybe<Users_Order_By>;
  user_id?: Maybe<Order_By>;
};

/** select columns of table "followable_users" */
export enum Followable_Users_Select_Column {
  /** column name */
  FollowableId = 'followable_id',
  /** column name */
  UserId = 'user_id'
}

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
  /** fetch data from the table: "followable_users" */
  followable_users: Array<Followable_Users>;
  /** fetch aggregated fields from the table: "followable_users" */
  followable_users_aggregate: Followable_Users_Aggregate;
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
export type Query_RootFollowable_UsersArgs = {
  distinct_on?: Maybe<Array<Followable_Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Followable_Users_Order_By>>;
  where?: Maybe<Followable_Users_Bool_Exp>;
};


/** query root */
export type Query_RootFollowable_Users_AggregateArgs = {
  distinct_on?: Maybe<Array<Followable_Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Followable_Users_Order_By>>;
  where?: Maybe<Followable_Users_Bool_Exp>;
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
  /** fetch data from the table: "followable_users" */
  followable_users: Array<Followable_Users>;
  /** fetch aggregated fields from the table: "followable_users" */
  followable_users_aggregate: Followable_Users_Aggregate;
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
export type Subscription_RootFollowable_UsersArgs = {
  distinct_on?: Maybe<Array<Followable_Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Followable_Users_Order_By>>;
  where?: Maybe<Followable_Users_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootFollowable_Users_AggregateArgs = {
  distinct_on?: Maybe<Array<Followable_Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Followable_Users_Order_By>>;
  where?: Maybe<Followable_Users_Bool_Exp>;
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
  /** An object relationship */
  followable_users?: Maybe<Followable_Users>;
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
  followable_users?: Maybe<Followable_Users_Bool_Exp>;
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
  followable_users?: Maybe<Followable_Users_Order_By>;
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
export const FollowUserDocument = gql`
    mutation FollowUser($userId: String!, $followerId: String!) {
  insert_followers_one(object: {user_id: $userId, follower_id: $followerId}) {
    follower_id
    user_id
  }
}
    `;
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
export const OtherUsersDocument = gql`
    query OtherUsers($userId: String!) {
  users(where: {id: {_neq: $userId}}) {
    ...UserComplete
  }
}
    ${UserCompleteFragmentDoc}`;
export const UserByPkDocument = gql`
    query UserByPk($email: String!) {
  users_by_pk(email: $email) {
    ...User
  }
}
    ${UserFragmentDoc}`;
export const UserByIdDocument = gql`
    query UserById($id: String!) {
  users(where: {id: {_eq: $id}}) {
    ...User
  }
}
    ${UserFragmentDoc}`;
export const UserFollowersDocument = gql`
    query UserFollowers($userId: String!) {
  users(where: {following: {user_id: {_eq: $userId}}}) {
    ...UserComplete
  }
}
    ${UserCompleteFragmentDoc}`;
export const UserFollowingDocument = gql`
    query UserFollowing($userId: String!) {
  followers(where: {follower_id: {_eq: $userId}}) {
    following {
      ...UserComplete
    }
  }
}
    ${UserCompleteFragmentDoc}`;
export const WhoImFollowingDocument = gql`
    subscription WhoImFollowing($followerId: String!) {
  followers(where: {follower_id: {_eq: $followerId}}) {
    following {
      ...UserComplete
    }
  }
}
    ${UserCompleteFragmentDoc}`;
export const WhosFollowingMeDocument = gql`
    subscription WhosFollowingMe($myId: String!) {
  followers(where: {user_id: {_eq: $myId}}) {
    following {
      ...UserComplete
    }
  }
}
    ${UserCompleteFragmentDoc}`;
export const FollowableUsersDocument = gql`
    subscription FollowableUsers($userId: String!) {
  users(where: {followable_users: {user_id: {_eq: $userId}}}) {
    ...UserComplete
  }
}
    ${UserCompleteFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    InsertUser(variables: InsertUserMutationVariables): Promise<InsertUserMutation> {
      return withWrapper(() => client.request<InsertUserMutation>(print(InsertUserDocument), variables));
    },
    FollowUser(variables: FollowUserMutationVariables): Promise<FollowUserMutation> {
      return withWrapper(() => client.request<FollowUserMutation>(print(FollowUserDocument), variables));
    },
    UnfollowUser(variables: UnfollowUserMutationVariables): Promise<UnfollowUserMutation> {
      return withWrapper(() => client.request<UnfollowUserMutation>(print(UnfollowUserDocument), variables));
    },
    OtherUsers(variables: OtherUsersQueryVariables): Promise<OtherUsersQuery> {
      return withWrapper(() => client.request<OtherUsersQuery>(print(OtherUsersDocument), variables));
    },
    UserByPk(variables: UserByPkQueryVariables): Promise<UserByPkQuery> {
      return withWrapper(() => client.request<UserByPkQuery>(print(UserByPkDocument), variables));
    },
    UserById(variables: UserByIdQueryVariables): Promise<UserByIdQuery> {
      return withWrapper(() => client.request<UserByIdQuery>(print(UserByIdDocument), variables));
    },
    UserFollowers(variables: UserFollowersQueryVariables): Promise<UserFollowersQuery> {
      return withWrapper(() => client.request<UserFollowersQuery>(print(UserFollowersDocument), variables));
    },
    UserFollowing(variables: UserFollowingQueryVariables): Promise<UserFollowingQuery> {
      return withWrapper(() => client.request<UserFollowingQuery>(print(UserFollowingDocument), variables));
    },
    WhoImFollowing(variables: WhoImFollowingSubscriptionVariables): Promise<WhoImFollowingSubscription> {
      return withWrapper(() => client.request<WhoImFollowingSubscription>(print(WhoImFollowingDocument), variables));
    },
    WhosFollowingMe(variables: WhosFollowingMeSubscriptionVariables): Promise<WhosFollowingMeSubscription> {
      return withWrapper(() => client.request<WhosFollowingMeSubscription>(print(WhosFollowingMeDocument), variables));
    },
    FollowableUsers(variables: FollowableUsersSubscriptionVariables): Promise<FollowableUsersSubscription> {
      return withWrapper(() => client.request<FollowableUsersSubscription>(print(FollowableUsersDocument), variables));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;