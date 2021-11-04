import { Route } from '@react-route-manager/react-route-manager';
import { CRYPTO_ROUTE } from '../pages/Crypto/Crypto.route';
import { GAME_ROUTE } from '../pages/Game/Game.route';
import { WELCOME_ROUTE } from '../pages/Welcome/Welcome.route';

/**
 * All routes in the application.
 *
 * @todo improved means of ordering the routes in their collections
 * https://github.com/miking-the-viking/react-route-manager/issues/19
 */
export const routes: Route[] = [
  WELCOME_ROUTE,
  GAME_ROUTE,
  // , CRYPTO_ROUTE
];
