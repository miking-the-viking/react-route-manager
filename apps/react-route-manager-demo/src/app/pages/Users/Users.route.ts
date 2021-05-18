import { lazy } from 'react';
import { RouteConfig } from '@react-route-manager/react-route-manager';
import { USERS_INDEX_ROUTE } from './UsersIndex/UsersIndex.route';
import { USERS_PROFILE_ROUTE } from './UsersProfile/UsersProfile.route';
import { faBlind } from '@fortawesome/free-solid-svg-icons';
import { RouterIcon } from '@react-route-manager/ui-components';
import { USERS_FOLLOWING_ROUTE } from './UsersFollowing/UsersFollowing.route';
import { REQUIRES_AUTH_LOGIN_REDIRECT } from '../../router/rules/RequiresAuth';

export const USERS = Symbol('Users');

export const USERS_ROUTE: RouteConfig = {
  key: USERS,
  path: 'users',
  icon: RouterIcon(faBlind),
  lazyLoadedComponent: lazy(() => import('./Users')),
  description: 'Users',
  name: 'Users',
  children: [USERS_INDEX_ROUTE, USERS_PROFILE_ROUTE, USERS_FOLLOWING_ROUTE],
  rules: [REQUIRES_AUTH_LOGIN_REDIRECT],
  collections: ['nav'],
};
