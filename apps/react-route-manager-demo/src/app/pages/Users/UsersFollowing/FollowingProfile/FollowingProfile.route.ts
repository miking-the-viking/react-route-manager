import { faIdCard } from '@fortawesome/free-solid-svg-icons';
import { Route } from '@react-route-manager/react-route-manager';
import { FollowState } from '../../../../router/hooks/useFollowState';
import { generatePath } from 'react-router-dom';
import { UserCompleteFragment } from '@react-route-manager/hooks-api';

export const FOLLOWING_PROFILE = Symbol('FollowingProfile');

const FOLlOWING_PATH = 'profile/:id';

const followingProfileRouteGenerator = ({
  path,
  variants = undefined,
  description = 'Following Profile',
  name = 'Profiles',
  absolutePath = undefined,
}) =>
  new Route({
    key: FOLLOWING_PROFILE,
    path,
    absolutePath,
    icon: faIdCard,
    importComponent: () => import('./FollowingProfile'),
    description,
    name,
    collections: ['nav'],
    variants,
  });

const followingRoute = (following: UserCompleteFragment) => {
  const { email, id, name } = following;
  const path = generatePath(FOLlOWING_PATH, { id });

  return followingProfileRouteGenerator({
    absolutePath: path,
    path,
    // TODO: These are not used in the Helmet
    name: `${name ? name : email}`,
    description: `${name ? name : email}'s User Profile`,
  });
};

export const FOLLOWING_PROFILE_ROUTE = followingProfileRouteGenerator({
  path: FOLlOWING_PATH,
  variants: ({ following = [] }: FollowState) => {
    return following.map(followingRoute);
  },
});
