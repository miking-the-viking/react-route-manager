import { RouteManagerRouteConfig, RouteRule } from './types';

export const processRules = <StateType extends {}>(
    state: StateType,
    rules?: RouteRule<StateType>[]
) => {
    if (!rules) {
        return true;
    }
    const filterRoute = rules.reduce((acc, rule) => {
        return acc && rule(state);
    }, true);
    return filterRoute;
};

/**
 * Processes a route through its rules returning a boolean indicating if it is accessible in the given context
 *
 * @param route
 * @param state
 *
 * @returns boolean
 */
export const processRouteThroughRules = <StateType extends {}>(
    route: RouteManagerRouteConfig<StateType>,
    state: StateType
): boolean => {
    return processRules(state, route.rules);
};

export default processRouteThroughRules;
