import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { Route } from '@react-route-manager/react-route-manager';
import { REQUIRES_AUTH_LOGIN_REDIRECT } from '../../../../router/rules/RequiresAuth';

export const FOLLOWING_ME = Symbol('FollowingMe');

export const FOLLOWING_ME_ROUTE = new Route({
  key: FOLLOWING_ME,
  path: 'following',
  icon: faUsers,
  importComponent: () => import('./FollowingMe'),
  description: 'Lists the users that are following me',
  name: 'Followers',
  rules: [REQUIRES_AUTH_LOGIN_REDIRECT],
  collections: ['nav'],
});
