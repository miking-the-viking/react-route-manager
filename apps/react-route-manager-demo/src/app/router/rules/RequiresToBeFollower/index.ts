import { RouteRule } from '@react-route-manager/react-route-manager';
import { AppState } from '@react-route-manager/ui-state';
import { AppRouteRuleEvaluator } from '../types';

export const RequiresToBeFollower: AppRouteRuleEvaluator = () => {
  // TODO
  return false;
};

export const REQUIRES_TO_BE_FOLLOWER_REDIRECT: RouteRule<AppState> = [
  [RequiresToBeFollower],
  '/',
];
