import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { Route } from '@react-route-manager/react-route-manager';

export const ABOUT = Symbol('About');
export const ABOUT_ROUTE = new Route({
  key: ABOUT,
  path: 'about',
  icon: faQuestion,
  importComponent: () => import('./About'),
  name: 'About',
  description: 'About this React Route Manager Demo App',
  collections: ['nav'],
});
