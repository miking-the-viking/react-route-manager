/**
 * The Route Manager will iteratively and recursively evaluated all RouteRules listed on a Route.
 * All rules must pass for a route to be evaluated as accessible.
 *
 * The state passed in is up to the implementing library based on the routes needs, but the values must be accessible in the context that the RouteManager gets initialized.
 *
 */
export type RouteRuleEvaluator<
  RouteManagerState extends Record<string, unknown>
> = (state: RouteManagerState) => boolean;

export type RuleGenerator<
  RouteManagerState extends Record<string, unknown>,
  DynamicProps extends any
> = (dynamicReqs: DynamicProps) => RouteRuleEvaluator<RouteManagerState>;
