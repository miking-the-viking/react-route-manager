import { UserCompleteFragment } from '@react-route-manager/hooks-api';
import { RouteRule } from '@react-route-manager/react-route-manager';
import { AppState } from '@react-route-manager/ui-state';
import { AppRouteRuleEvaluator } from '../types';

export const RequiresFollowers: AppRouteRuleEvaluator<{
  followers?: UserCompleteFragment[];
}> = ({ followers }) => {
  return followers && followers.length > 0;
};

export const REQUIRES_FOLLOWERS_REDIRECT: RouteRule<AppState> = [
  [RequiresFollowers],
  '/',
];
