import { RouteRuleEvaluator } from './RouteRuleEvaluator';

/**
 * A Route Rule reduces one or more RouteRuleEvaluator functions to their overall boolean.
 *  If falsy, returns the redirect string.
 *
 */
export type RouteRule<RouteManagerState extends Record<string, unknown>> = [
  (
    | RouteRuleEvaluator<RouteManagerState>
    | RouteRuleEvaluator<RouteManagerState>[]
  ),
  string | symbol
];
