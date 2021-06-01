import { faBlind } from '@fortawesome/free-solid-svg-icons';
import { Route } from '@react-route-manager/react-route-manager';
import { TROPHY_ROUTE } from './Trophy/Trophy.route';

export const GAME = Symbol('Game');
export const GAME_ROUTE = new Route({
  key: GAME,
  path: 'game',
  importComponent: () => import('./Game'),
  name: 'Game',
  description: 'Game to drive state',
  icon: faBlind,
  collections: ['nav'],
  children: [TROPHY_ROUTE],
});
