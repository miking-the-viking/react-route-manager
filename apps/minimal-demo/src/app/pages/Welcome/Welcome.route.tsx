import { faHandMiddleFinger } from '@fortawesome/free-solid-svg-icons';
import { Route, RRM } from '@react-route-manager/react-route-manager';
import { WELCOME } from './Welcome.symbol';

export const WELCOME_ROUTE = RRM.Route({
  key: WELCOME,
  path: '/',
  importComponent: () => import('./Welcome'),
  name: 'Welcome',
  description: 'Main Welcome page for all visitors',
  icon: faHandMiddleFinger,
  collections: ['nav'],
});
