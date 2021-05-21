import { faBlind } from '@fortawesome/free-solid-svg-icons';
import { UserFollowingQuery } from '@react-route-manager/hooks-api';
import { RouterIcon } from '@react-route-manager/ui-components';
import { AppRouteConfig } from '../../../../router/rules/types';
import { lazy } from 'react';
import { generatePath } from 'react-router-dom';
import { RouteConfigInput } from '@react-route-manager/react-route-manager';

type VariantsArgs = {
  following: UserFollowingQuery['followers'];
};

export const FOLLOWING_PROFILE = Symbol('FollowingProfile');

const path = 'profile/:id';

// type RouteProps = RouteConfigInput<VariantsArgs>;

// const FOLLOWING_PROFILE_ROUTE_GENERATOR = ({
//   key,
//   icon,
//   name,
//   rules,
//   path,
//   description,
//   collections,
// }: Partial<RouteProps>) => ({
//   key: FOLLOWING_PROFILE,
//   icon: RouterIcon(faBlind),
//   // path,
//   lazyLoadedComponent: lazy(() => import('./FollowingProfile')),
//   description: 'Following Profile',
//   name: 'Profiles',
//   collections: ['nav'],
// });

export const FOLLOWING_PROFILE_ROUTE: AppRouteConfig<VariantsArgs> = {
  key: FOLLOWING_PROFILE,
  path,
  icon: RouterIcon(faBlind),
  lazyLoadedComponent: lazy(() => import('./FollowingProfile')),
  description: 'Following Profile',
  name: 'Profiles',
  collections: ['nav'],
  variants: ({ following = [] }) => {
    return following.map((foll) => {
      const { email, id, name } = foll.following;
      return {
        key: FOLLOWING_PROFILE,
        absolutePath: generatePath(path, { id }),
        icon: RouterIcon(faBlind),
        collections: ['nav'],
        name: `${name ? name : email} User Profile`,
        description: `User profile for ${name ? name : email}`,
        lazyLoadedComponent: lazy(() => import('./FollowingProfile')), // todo remove the need for this
        path: generatePath(path, { id }),
      };
    });
  },
  variantFilter: (variants, params: Record<string, string>) =>
    variants.find((v) => v.path === generatePath(path, params)),
};

// export const FOLLOWING_PROFILE_ROUTE: AppRouteConfig<VariantsArgs> = {
//   key: FOLLOWING_PROFILE,
//   path,
//   icon: RouterIcon(faBlind),
//   lazyLoadedComponent: lazy(() => import('./FollowingProfile')),
//   description: 'Following Profile',
//   name: 'Profiles',
//   collections: ['nav'],
//   variants: ({ following = [] }) => {
//     return following.map((foll) => {
//       const { email, id, name } = foll.following;
//       return {
//         key: FOLLOWING_PROFILE,
//         absolutePath: generatePath(path, { id }),
//         icon: RouterIcon(faBlind),
//         collections: ['nav'],
//         name: `${name ? name : email} User Profile`,
//         description: `User profile for ${name ? name : email}`,
//         lazyLoadedComponent: lazy(() => import('./FollowingProfile')), // todo remove the need for this
//         path: generatePath(path, { id }),
//       };
//     });
//   },
//   variantFilter: (variants, params: Record<string, string>) =>
//     variants.find((v) => v.path === generatePath(path, params)),
// };
