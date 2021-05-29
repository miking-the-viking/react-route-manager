import { Route } from '@react-route-manager/react-route-manager';
import { REQUIRES_AUTH_LOGIN_REDIRECT } from '../../../router/rules/RequiresAuth';
import { FOLLOWING_FOLLOWABLE_USERS_ROUTE } from './FollowingFollowableUsers/FollowingFollowableUsers.route';
import { FOLLOWING_INDEX_ROUTE } from './FollowingIndex/FollowingIndex.route';
import { FOLLOWING_ME_ROUTE } from './FollowingMe/FollowingMe.route';
import { FOLLOWING_PROFILE_ROUTE } from './FollowingProfile/FollowingProfile.route';

export const USERS_FOLLOWING = Symbol('UsersFollowing');

export const USERS_FOLLOWING_ROUTE = new Route({
  key: USERS_FOLLOWING,
  path: 'following',
  importComponent: () => import('./UsersFollowing'),
  description: "Users that I'm following or can follow",
  name: 'Followers and Followees',
  children: [
    FOLLOWING_INDEX_ROUTE,
    FOLLOWING_ME_ROUTE,
    FOLLOWING_FOLLOWABLE_USERS_ROUTE,
    FOLLOWING_PROFILE_ROUTE,
  ],
  rules: [REQUIRES_AUTH_LOGIN_REDIRECT],
  collections: ['nav'],
});
