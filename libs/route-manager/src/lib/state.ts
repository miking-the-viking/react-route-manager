import { EvaluatedRouteManagerRoute, RouteManagerRouteConfig } from './types';

export interface RouteManagerState<i extends {}> {
    coreRoutes: RouteManagerRouteConfig<i>[];
    setCoreRoutes: (coreRoute: RouteManagerRouteConfig<i>[]) => void;
    evaluatedRoutes: EvaluatedRouteManagerRoute<i>[];
}
