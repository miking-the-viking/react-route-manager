import { RouteManagerRouteConfig, EvaluatedRouteManagerRoute } from './types';
import processRouteThroughRules from './processRouteThroughRules';

export const recursiveEvaluatedRoutes = <StateType extends {}>(
    routes: RouteManagerRouteConfig<StateType>[],
    state: StateType
): EvaluatedRouteManagerRoute<StateType>[] => {
    /**
     * Filtered of the `routes` that passed its rule evaluation
     */
    const filtered = routes.filter(route => {
        return processRouteThroughRules(route, state);
    });

    const recursivelyProcessed = filtered.map(route => {
        const subrouteWithParentRouteDefaultData = (
            sub: Partial<typeof route>
        ) => ({
            ...route,
            ...sub,
            subRoutes: sub.subRoutes
        });
        const mappedSubroutes = route.subRoutes
            ? route
                  .subRoutes(state)
                  .map(sub => subrouteWithParentRouteDefaultData(sub))
            : undefined;
        const routeSubroutesWithDefaults = mappedSubroutes
            ? recursiveEvaluatedRoutes(mappedSubroutes, state)
            : [];

        return {
            ...route,
            subRoutes: routeSubroutesWithDefaults
        };
    });

    return recursivelyProcessed;
};

export default recursiveEvaluatedRoutes;
