import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Route } from '@react-route-manager/react-route-manager';
import { REQUIRES_AUTH_LOGIN_REDIRECT } from '../../../router/rules/RequiresAuth';

export const USERS_INDEX = Symbol('UsersIndex');

export const USERS_INDEX_ROUTE = new Route({
  key: USERS_INDEX,
  path: '/',
  icon: faHome,
  importComponent: () => import('./UsersIndex'),
  description: 'Main Users Dashboard page',
  name: 'Dashboard',
  rules: [REQUIRES_AUTH_LOGIN_REDIRECT],
  collections: ['nav'],
});
