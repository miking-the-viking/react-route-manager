import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { RRM } from '@react-route-manager/react-route-manager';
import { ABOUT } from './About.symbol';

export const ABOUT_ROUTE = RRM.Route({
  key: ABOUT,
  path: 'about',
  icon: faQuestion,
  importComponent: () => import('./About'),
  name: 'About',
  description: 'About this React Route Manager Demo App',
  collections: ['nav'],
});
