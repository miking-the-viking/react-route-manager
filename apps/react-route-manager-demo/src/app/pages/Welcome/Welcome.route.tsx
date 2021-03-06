import { faBlind } from '@fortawesome/free-solid-svg-icons';
import { Route } from '@react-route-manager/react-route-manager';
import { REQUIRES_GUEST_LOGIN_REDIRECT } from '../../router/rules/RequiresGuest';

export const WELCOME = Symbol('Welcome');
export const WELCOME_ROUTE = new Route({
  key: WELCOME,
  path: '/',
  importComponent: () => import('./Welcome'),
  name: 'Welcome',
  description: 'Main Welcome page for all visitors',
  icon: faBlind,
  rules: [REQUIRES_GUEST_LOGIN_REDIRECT],
});
