import { faBlind } from '@fortawesome/free-solid-svg-icons';
import { RouteConfigg } from '@react-route-manager/react-route-manager';
import { RouterIcon } from '@react-route-manager/ui-components';
import { REQUIRES_AUTH_LOGIN_REDIRECT } from '../../../router/rules/RequiresAuth';
import { FOLLOWING_FOLLOWABLE_USERS_ROUTE } from './FollowingFollowableUsers/FollowingFollowableUsers.route';
import { FOLLOWING_INDEX_ROUTE } from './FollowingIndex/FollowingIndex.route';
import { FOLLOWING_PROFILE_ROUTE } from './FollowingProfile/FollowingProfile.route';

export const USERS_FOLLOWING = Symbol('UsersFollowing');

export const USERS_FOLLOWING_ROUTE = new RouteConfigg({
  key: USERS_FOLLOWING,
  path: 'following',
  icon: RouterIcon(faBlind),
  importComponent: () => import('./UsersFollowing'),
  description: "Users that I'm following or can follow",
  name: 'Followers and Followees',
  children: [
    FOLLOWING_INDEX_ROUTE,
    FOLLOWING_FOLLOWABLE_USERS_ROUTE,
    FOLLOWING_PROFILE_ROUTE,
  ],
  rules: [REQUIRES_AUTH_LOGIN_REDIRECT],
  collections: ['nav'],
});
