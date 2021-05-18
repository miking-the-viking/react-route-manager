import { lazy } from 'react';
import { RouteConfig } from '@react-route-manager/react-route-manager';
import { faBlind } from '@fortawesome/free-solid-svg-icons';
import { RouterIcon } from '@react-route-manager/ui-components';
import { REQUIRES_AUTH_LOGIN_REDIRECT } from '../../../../router/rules/RequiresAuth';

export const FOLLOWING_FOLLOWABLE_USERS = Symbol('FollowingFollowableUsers');

export const FOLLOWING_FOLLOWABLE_USERS_ROUTE: RouteConfig = {
  key: FOLLOWING_FOLLOWABLE_USERS,
  path: 'followable',
  icon: RouterIcon(faBlind),
  lazyLoadedComponent: lazy(() => import('./FollowingFollowableUsers')),
  description:
    'Lists the users that are followable (ie. I am not following them yet)',
  name: 'Everyone that I can follow',
  rules: [REQUIRES_AUTH_LOGIN_REDIRECT],
  collections: ['nav'],
};
