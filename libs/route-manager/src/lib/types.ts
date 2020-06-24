/**
 * The Route Manager will iteratively and recursively evaluated all RouteRules listed on a Route.
 * All rules musdt pass for a route to be evaluated as accessible.
 *
 * The state passed in is up to the implementing library based on the routes needs, but the values must be accessible in the context that the RouteManager gets initialized.
 *
 */
export type RouteRule<RouteManagerState extends {}> = (
    state: RouteManagerState
) => boolean;

/**
 * RouteBaseType extends the generic application state in order to ensure type safety on the route's rules
 */
interface CoreRouteManagerRoute<RouteManagerState extends {}> {
    /**
     * The url path that the route is registered at
     */
    path: string;

    /**
     * The name of the route
     */
    name: string;

    /**
     * Description
     */
    description?: string;

    /**
     * A string of collections that the route belongs to,
     * this is helpful if there are multuple navigation components in an application
     * that can return the same route for instance. For instance the main nav "home" and an admin's sub-nav
     *
     */
    collections?: string[];

    /**
     * Optional icon component function for use in the UI
     */
    icon: (props: any) => JSX.Element | null;

    /**
     * React Lazy loaded page component
     */
    render: any;

    /**
     *
     */
    rules?: RouteRule<RouteManagerState>[];

    /**
     * Fallback path to redirect to if the user finds themselves on that page and the rules fail
     *
     */
    fallback: string;
}

/**
 * RouteManagerRoute ensures generic type safety on the defined rules and subroutes for the Route objects in the app
 */
export interface RouteManagerRouteConfig<AppState extends {}>
    extends CoreRouteManagerRoute<AppState> {
    subRoutes?: (
        state: AppState
    ) => Partial<RouteManagerRouteConfig<AppState>>[];
}

export interface EvaluatedRouteManagerRoute<AppState extends {}>
    extends CoreRouteManagerRoute<AppState> {
    subRoutes?: EvaluatedRouteManagerRoute<AppState>[];
}
