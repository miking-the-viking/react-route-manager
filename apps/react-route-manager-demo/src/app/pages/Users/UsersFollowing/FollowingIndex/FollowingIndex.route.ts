import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { Route } from '@react-route-manager/react-route-manager';
import { REQUIRES_AUTH_LOGIN_REDIRECT } from '../../../../router/rules/RequiresAuth';

export const FOLLOWING_INDEX = Symbol('FollowingIndex');

export const FOLLOWING_INDEX_ROUTE = new Route({
  key: FOLLOWING_INDEX,
  path: '/',
  icon: faUserFriends,
  importComponent: () => import('./FollowingIndex'),
  description: 'Following Index Page shows everyone that I am following.',
  name: "Everyone I'm Following",
  rules: [REQUIRES_AUTH_LOGIN_REDIRECT],
  collections: ['nav'],
});
