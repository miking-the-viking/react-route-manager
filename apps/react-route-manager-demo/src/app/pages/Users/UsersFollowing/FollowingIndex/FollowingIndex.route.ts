import { faBlind } from '@fortawesome/free-solid-svg-icons';
import { RouteConfigg } from '@react-route-manager/react-route-manager';
import { RouterIcon } from '@react-route-manager/ui-components';
import { REQUIRES_AUTH_LOGIN_REDIRECT } from '../../../../router/rules/RequiresAuth';

export const FOLLOWING_INDEX = Symbol('FollowingIndex');

export const FOLLOWING_INDEX_ROUTE = new RouteConfigg({
  key: FOLLOWING_INDEX,
  path: '/',
  icon: RouterIcon(faBlind),
  importComponent: () => import('./FollowingIndex'),
  description: 'Following Index Page shows everyone that I am following.',
  name: "Everyone I'm Following",
  rules: [REQUIRES_AUTH_LOGIN_REDIRECT],
  collections: ['nav'],
});
