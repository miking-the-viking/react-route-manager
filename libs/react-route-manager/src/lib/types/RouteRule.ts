import { RouteRuleEvaluator, RuleGenerator } from './RouteRuleEvaluator';

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

export type RouteRuleGen<
  RouteManagerState extends Record<string, unknown>,
  DynamicProps extends any
> = [
  (
    | RuleGenerator<RouteManagerState, DynamicProps>
    | RuleGenerator<RouteManagerState, DynamicProps>[]
  ),
  string | symbol // TODO: support redirect to the parent variant
];
