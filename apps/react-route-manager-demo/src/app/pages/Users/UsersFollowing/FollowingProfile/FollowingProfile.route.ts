import { faBlind } from '@fortawesome/free-solid-svg-icons';
import { RouteConfigg } from '@react-route-manager/react-route-manager';
import { RouterIcon } from '@react-route-manager/ui-components';
import { generatePath } from 'react-router-dom';
import { UsersContextualState } from '../../UsersContext';

export const FOLLOWING_PROFILE = Symbol('FollowingProfile');

const FOLlOWING_PATH = 'profile/:id';

const followingProfileRouteGenerator = ({
  path,
  variants = undefined,
  description = 'Following Profile',
  name = 'Profiles',
  absolutePath = undefined,
}) =>
  new RouteConfigg({
    key: FOLLOWING_PROFILE,
    path,
    absolutePath,
    icon: RouterIcon(faBlind),
    importComponent: () => import('./FollowingProfile'),
    description,
    name,
    collections: ['nav'],
    variants,
  });

const followingRoute = (following) => {
  const { email, id, name } = following.following;
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
  variants: ({ following = [] }: UsersContextualState) => {
    return following.map(followingRoute);
  },
});
