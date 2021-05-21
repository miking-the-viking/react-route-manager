import { faBlind } from '@fortawesome/free-solid-svg-icons';
import { RouteConfigg } from '@react-route-manager/react-route-manager';
import { RouterIcon } from '@react-route-manager/ui-components';

export const USERS_PROFILE = Symbol('UsersProfile');

export const USERS_PROFILE_ROUTE = new RouteConfigg({
  key: USERS_PROFILE,
  path: 'profile',
  icon: RouterIcon(faBlind),
  importComponent: () => import('./UsersProfile'),
  description: 'My User Profile',
  name: 'My Profile',
  collections: ['nav'],
});
