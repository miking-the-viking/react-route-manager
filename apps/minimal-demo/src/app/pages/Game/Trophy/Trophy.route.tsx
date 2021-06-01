import { faBlind } from '@fortawesome/free-solid-svg-icons';
import { Route } from '@react-route-manager/react-route-manager';
import { REQUIRES_CLICKS_REDIRECT } from '../../../router/rules/HasClicks/HasClicks';

export const TROPHY = Symbol('Trophy');
export const TROPHY_ROUTE = new Route({
  key: TROPHY,
  path: 'trophy',
  importComponent: () => import('./Trophy'),
  name: 'Trophy',
  description: 'Trophy for big numbers',
  icon: faBlind,
  collections: ['nav'],
  rules: [REQUIRES_CLICKS_REDIRECT],
});
