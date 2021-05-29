import { faIdCardAlt } from '@fortawesome/free-solid-svg-icons';
import { Route } from '@react-route-manager/react-route-manager';

export const USERS_PROFILE = Symbol('UsersProfile');

export const USERS_PROFILE_ROUTE = new Route({
  key: USERS_PROFILE,
  path: 'profile',
  icon: faIdCardAlt,
  importComponent: () => import('./UsersProfile'),
  description: 'My User Profile',
  name: 'My Profile',
  collections: ['nav'],
});
