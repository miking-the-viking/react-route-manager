import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { Route } from '@react-route-manager/react-route-manager';
import { REQUIRES_AUTH_LOGIN_REDIRECT } from '../../../../router/rules/RequiresAuth';

export const FOLLOWERS_INDEX = Symbol('FollowersIndex');

export const FOLLOWERS_INDEX_ROUTE = new Route({
  key: FOLLOWERS_INDEX,
  path: '/',
  icon: faUserFriends,
  importComponent: () => import('./FollowersIndex'),
  description: 'Followers Index Page lists everyone that is following me.',
  name: 'Followers',
  rules: [REQUIRES_AUTH_LOGIN_REDIRECT],
  collections: ['nav'],
});
