import {
  RouteRule,
  RouteRuleEvaluator,
} from '@react-route-manager/react-route-manager';

export type ClickState = {
  clicks: number;
};

export const RequiresClicks: RouteRuleEvaluator<ClickState> = ({ clicks }) => {
  return !!clicks && clicks > 0;
};

/**
 * Basic Requires Auth RedirectRule
 *
 */
export const REQUIRES_CLICKS_REDIRECT: RouteRule<ClickState> = [
  [RequiresClicks],
  'game',
];
