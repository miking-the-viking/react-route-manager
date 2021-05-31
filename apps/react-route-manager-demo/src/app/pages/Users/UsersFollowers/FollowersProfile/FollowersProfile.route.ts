import { faIdCard } from '@fortawesome/free-solid-svg-icons';
import { Route } from '@react-route-manager/react-route-manager';
import { FollowState } from '../../../../router/hooks/useFollowState';
import { generatePath } from 'react-router-dom';
import { UserCompleteFragment } from '@react-route-manager/hooks-api';

export const FOLLOWERS_PROFILE = Symbol('FollowersProfile');

const FOLLOWERS_PROFILE_PATH = 'profile/:id';

const followersProfileRouteGenerator = ({
  path,
  variants = undefined,
  description = 'Following Profile',
  name = 'Profiles',
  absolutePath = undefined,
}) =>
  new Route({
    key: FOLLOWERS_PROFILE,
    path,
    absolutePath,
    icon: faIdCard,
    importComponent: () => import('./FollowersProfile'),
    description,
    name,
    collections: ['nav'],
    variants,
  });

const followersRoute = (followers: UserCompleteFragment) => {
  const { email, id, name } = followers;
  const path = generatePath(FOLLOWERS_PROFILE_PATH, { id });

  return followersProfileRouteGenerator({
    absolutePath: path,
    path,
    // TODO: These are not used in the Helmet
    name: `${name ? name : email}`,
    description: `${name ? name : email}'s User Profile`,
  });
};

export const FOLLOWERS_PROFILE_ROUTE = followersProfileRouteGenerator({
  path: FOLLOWERS_PROFILE_PATH,
  variants: ({ followers = [] }: FollowState) => {
    return followers.map(followersRoute);
  },
});
