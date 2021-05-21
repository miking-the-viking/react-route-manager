import { Route } from '@react-route-manager/react-route-manager';
import { ABOUT_ROUTE } from '../pages/About/About.route';
import { USERS_ROUTE } from '../pages/Users/Users.route';
import { WELCOME_ROUTE } from '../pages/Welcome/Welcome.route';
import { RouterState } from './RouterState.type';

export const routes: Route<RouterState>[] = [
  ABOUT_ROUTE,
  WELCOME_ROUTE,
  USERS_ROUTE,
];
