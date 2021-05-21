import { Route } from '@react-route-manager/react-route-manager';

export const ABOUT = Symbol('About');
export const ABOUT_ROUTE = new Route({
  key: ABOUT,
  path: 'about',
  importComponent: () => import('./About'),
  name: 'About',
  description: 'About this React Route Manager Demo App',
  collections: ['nav'],
});
