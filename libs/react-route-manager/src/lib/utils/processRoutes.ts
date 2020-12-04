import { ProcessedRouteConfig, RouteConfig } from "../types/RouteConfig";
import { RouteRule } from "../types/RouteRule";
import { RouteRuleEvaluator } from "../types/RouteRuleEvaluator";

/**
 * Processes the routes based off the current application state
 *
 * @param routes
 * @param state
 */
export const processRoutes = <StateType extends Record<string, unknown>>(
  routes: RouteConfig<StateType>[],
  state: StateType,
  parentPath = "/"
): ProcessedRouteConfig<StateType>[] =>
  routes
    .filter((route) => !processRules(state, route.rules))
    .map((route) => {
      const baseAbsolutePath =
        parentPath + (route.path !== "/" ? route.path : "");

      const absolutePath =
        baseAbsolutePath +
        (baseAbsolutePath.lastIndexOf("/") === baseAbsolutePath.length - 1
          ? ""
          : "/");

      const processedVariants = route.variants
        ? route.variants(state as any)
        : [];

      console.log(
        "processedVariants for " + route.name,
        route.variants,
        state,
        processedVariants
      );

      return {
        ...route,
        absolutePath,
        children: route.children
          ? processRoutes<StateType>(route.children, state, absolutePath)
          : undefined,
        processedVariants,
      } as ProcessedRouteConfig<StateType>;
    });

export const processRules = <StateType extends Record<string, unknown>>(
  state: StateType,
  ruleConfigs?: RouteRule<StateType>[]
) => {
  if (!ruleConfigs) return null;

  return ruleConfigs.reduce((acc: string | null, ruleConfig) => {
    if (acc !== null) return acc; // redirect string is defined, just bail as it is the first redirect
    const [ruleEvaluators, redirectPath] = ruleConfig;
    const evaluated = processEvaluators(state, ruleEvaluators)
      ? acc
      : redirectPath;
    return evaluated;
  }, null);
};

/**
 * Evaluates one or more rules with a given state returning a boolean value indicating if all the rules passed or not.
 *
 * @param state
 * @param ruleOrRules
 */
const processEvaluators = <StateType extends Record<string, unknown>>(
  state: StateType,
  ruleOrRules?: RouteRuleEvaluator<StateType> | RouteRuleEvaluator<StateType>[]
) => {
  if (!ruleOrRules) return true;

  if (!(ruleOrRules instanceof Array)) {
    return ruleOrRules(state);
  }

  if (ruleOrRules.length === 0) {
    return true;
  }

  return ruleOrRules.reduce((acc, rule) => {
    return acc && rule(state);
  }, true);
};
