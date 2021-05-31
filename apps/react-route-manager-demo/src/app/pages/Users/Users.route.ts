import { faBlind } from '@fortawesome/free-solid-svg-icons';
import { Route } from '@react-route-manager/react-route-manager';
import { REQUIRES_AUTH_LOGIN_REDIRECT } from '../../router/rules/RequiresAuth';
import { USERS_FOLLOWERS_ROUTE } from './UsersFollowers/UsersFollowers.route';
import { USERS_FOLLOWING_ROUTE } from './UsersFollowing/UsersFollowing.route';
import { USERS_INDEX_ROUTE } from './UsersIndex/UsersIndex.route';
import { USERS_PROFILE_ROUTE } from './UsersProfile/UsersProfile.route';

export const USERS = Symbol('Users');

export const USERS_ROUTE = new Route({
  key: USERS,
  path: 'users',
  icon: faBlind,
  importComponent: () => import('./Users'),
  description: 'Users',
  name: 'Users',
  children: [
    USERS_INDEX_ROUTE,
    USERS_PROFILE_ROUTE,
    USERS_FOLLOWING_ROUTE,
    USERS_FOLLOWERS_ROUTE,
  ],
  rules: [REQUIRES_AUTH_LOGIN_REDIRECT],
  collections: ['nav'],
});
