import { faBlind } from '@fortawesome/free-solid-svg-icons';
import { RRM } from '@react-route-manager/react-route-manager';
import { GAME } from './Game.symbol';
import { TROPHY_ROUTE } from './Trophy/Trophy.route';

export const GAME_ROUTE = RRM.Route({
  key: GAME,
  path: 'game',
  importComponent: () => import('./Game'),
  name: 'Game',
  description: 'Game to drive state',
  icon: faBlind,
  collections: ['nav'],
  children: [TROPHY_ROUTE],
});
