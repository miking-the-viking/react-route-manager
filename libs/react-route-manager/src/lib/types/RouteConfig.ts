import { RouteRule } from "./RouteRule";

/**
 * RouteBaseType extends the generic application state in order to ensure type safety on the route's rules
 */
export interface RouteConfig<
  RouteManagerState extends Record<string, unknown> = Record<string, unknown>
> {
  /**
   * The relative url path that router should match to
   *
   */
  path: string;

  /**
   * The name of the route
   */
  name: string;

  /**
   * Description
   */
  description: string;

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
  lazyLoadedComponent: any;

  /**
   * Rules applied to a route to permit access to it,
   *
   * Defined as a tuple of
   *
   *   - RouteRule or RouteRule array
   *   - Fallback path
   *
   */
  rules?: RouteRule<RouteManagerState>[];

  children?: RouteConfig<RouteManagerState>[];
}

export interface ProcessedRouteConfig<
  RouteManagerState extends Record<string, unknown> = Record<string, unknown>
> extends RouteConfig<RouteManagerState> {
  /**
   * Computed absolute path within the route object
   *
   */
  absolutePath: string;

  children?: ProcessedRouteConfig<RouteManagerState>[];
}
