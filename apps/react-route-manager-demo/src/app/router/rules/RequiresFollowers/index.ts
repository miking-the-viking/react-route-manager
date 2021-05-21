import {
  RouteRule,
  RouteRuleEvaluator,
} from '@react-route-manager/react-route-manager';
import { AppState } from '@react-route-manager/ui-state';
import { UsersContextualState } from '../../../pages/Users/UsersContext';
import { AppRouteRuleEvaluator } from '../types';

export const RequiresFollowers: AppRouteRuleEvaluator = (
  {
    // followers
  }
) => {
  // TODO
  return false;
};

export const REQUIRES_FOLLOWERS_REDIRECT: RouteRule<AppState> = [
  [RequiresFollowers],
  '/',
];
