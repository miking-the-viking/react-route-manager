import { RouteRule } from '@react-route-manager/react-route-manager';
import { AppState } from '@react-route-manager/ui-state';
import { AppRouteRuleEvaluator } from '../types';

export const RequiresMinimumFollowers: AppRouteRuleEvaluator = () => {
  // TODO
  return false;
};

export const REQUIRES_MINIMUM_FOLLOWERS_REDIRECT: RouteRule<AppState> = [
  [RequiresMinimumFollowers],
  '/',
];
