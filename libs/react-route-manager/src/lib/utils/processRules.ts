import { RouteRule } from '@react-route-manager/react-route-manager';
import { StaticRouteRule } from '../RouteRule/RouteRule';
import { RouteRuleEvaluator } from '../types/RouteRuleEvaluator';
type Constructor<T> = {
  new (): T;
  from<T>(this: Constructor<T>, data?: Partial<T>): T;
};

export const processRules = <StateType extends Record<string, unknown>>(
  state: StateType,
  ruleConfigs?: (RouteRule<StateType> & StaticRouteRule<StateType>)[] // TODO: This should be Static | Dynamic Route Rules
): string | symbol | null => {
  if (!ruleConfigs) return null;
  console.log('ruleConfigs', ruleConfigs);
  if (ruleConfigs)
    return ruleConfigs.reduce((acc: string | null, ruleConfig) => {
      if (acc !== null) return acc; // redirect string is defined, just bail as it is the first redirect
      // if ruleTuple exists, then it's StaticRoute or DynamicRoute
      if (ruleConfig.ruleTuple) {
        const [ruleEvaluators, redirectPath] = ruleConfig.ruleTuple;
        const evaluated = processEvaluators(state, ruleEvaluators)
          ? acc
          : redirectPath;
        return evaluated;
      }
      // TODO: this should be removed once fully embracing decorator and static class
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
