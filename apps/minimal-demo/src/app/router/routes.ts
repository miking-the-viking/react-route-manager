import { Route } from '@react-route-manager/react-route-manager';
import { ABOUT_ROUTE } from '../pages/About/About.route';
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
  ABOUT_ROUTE,
  WELCOME_ROUTE,
  GAME_ROUTE,
  CRYPTO_ROUTE,
];
