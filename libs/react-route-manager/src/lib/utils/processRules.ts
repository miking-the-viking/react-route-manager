import { RouteRule } from '../types/RouteRule';
import { RouteRuleEvaluator } from '../types/RouteRuleEvaluator';

export const processRules = <StateType extends Record<string, unknown>>(
  state: StateType,
  ruleConfigs?: RouteRule<StateType>[]
): string | symbol | null => {
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
