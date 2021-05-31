import { Route } from '@react-route-manager/react-route-manager';
import { REQUIRES_FOLLOWERS_REDIRECT } from '../../../router/rules';
import { REQUIRES_AUTH_LOGIN_REDIRECT } from '../../../router/rules/RequiresAuth';
import { FOLLOWERS_INDEX_ROUTE } from './FollowersIndex/FollowersIndex.route';
import { FOLLOWERS_PROFILE_ROUTE } from './FollowersProfile/FollowersProfile.route';
export const USERS_FOLLOWERS = Symbol('UsersFollowing');

export const USERS_FOLLOWERS_ROUTE = new Route({
  key: USERS_FOLLOWERS,
  path: 'followers',
  importComponent: () => import('./UsersFollowers'),
  description: 'Users Following Me',
  name: 'Followers',
  children: [FOLLOWERS_INDEX_ROUTE, FOLLOWERS_PROFILE_ROUTE],
  rules: [REQUIRES_AUTH_LOGIN_REDIRECT, REQUIRES_FOLLOWERS_REDIRECT],
  collections: ['nav'],
});
