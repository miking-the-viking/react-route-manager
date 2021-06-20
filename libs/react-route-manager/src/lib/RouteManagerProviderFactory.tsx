/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useNavigate, useLocation, generatePath } from 'react-router';
import { BrowserProvider } from './BrowserProvider';
import { IndexRouter } from './IndexRouter';
import { RouteManagerContext } from './RouteManagerContext';
import {
  ProcessedRouteConfig,
  RouteRule,
  RouteRuleEvaluator,
  RuleGenerator,
} from './types';
import { Route } from './types/Route';
import { RouteManagerProviderProps } from './types/RouteManagerProviderProps';
import { RouteManagerState } from './types/RouteManagerState';
import { allowedRoutesActiveRoute } from './utils/allowedRoutesActiveRoute';
import { processRoutes } from './utils/processRoutes';
import { processRules } from './utils/processRules';

/**
 *
 * RouteManagerProviderFactory is used to generate a typesafe, dynamic RouteManager Context Provider
 *
 * This generated component is responsible for automatically checking the route rules
 * and redirecting the user if they are accessing a non-valid route.
 *
 */
export const RouteManagerProviderFactory: <R extends Record<string, unknown>>(
  routes: Route<R>[]
) => React.FC<RouteManagerProviderProps<R>> = <
  Ri extends Record<string, unknown>
>(
  routes
) => {
  const RouterProvider: React.FC<RouteManagerProviderProps<Ri>> = ({
    RouterWrapper,
    state,
  }) => {
    const Context = RouteManagerContext as React.Context<RouteManagerState<Ri>>;
    const router = <IndexRouter routes={routes} />;
    const { pathname: path } = useLocation();
    const navigate = useNavigate();

    /**
     * Variants are routes that have a dynamic aspect to them, reusing a Route
     *
     * Variant State allows for evaluating variant functions to determine which routes should be available to use user in the present context
     */
    const [variantState, setVariantState] = useState<Record<string, any>>({});

    const handleSetVariantState = useCallback(
      (key: string, value: any) =>
        setVariantState((currentState) => {
          // Make sure we don't cause a chain-reaction update if a value is being set to the same thing
          // Without this, the rendering of the users list would continually restart and retrigger unique subscription events with the same data.
          if (JSON.stringify(currentState[key]) === JSON.stringify(value))
            return currentState;

          return { ...currentState, [key]: value };
        }),
      [setVariantState]
    );

    const [keyMapping, allowedRoutes] = useMemo(
      () =>
        processRoutes<Ri>(
          routes,
          {
            ...state,
            ...variantState,
          },
          '/'
        ),
      [state, variantState]
    );

    const activeRoute = useMemo(() => {
      if (!allowedRoutes || allowedRoutes.length === 0) return null;
      const activeRoute = allowedRoutesActiveRoute<Ri>(allowedRoutes, path);
      return activeRoute;
    }, [allowedRoutes, path]);

    const allowedRouteBySymbol = useCallback(
      (key: symbol, params?: Record<string, unknown>) => {
        const resolvedRoute = keyMapping[key] as ProcessedRouteConfig<Ri>;
        if (!resolvedRoute) return null;

        // if a variant, then we need to retrieve the correct variant.
        if (resolvedRoute.variantFilter) {
          const resolvedVariantRoute = resolvedRoute.variantFilter(
            resolvedRoute.processedVariants,
            params
          );

          if (!params || !resolvedVariantRoute) return resolvedVariantRoute; // TODO: This is likely an error state

          return resolvedVariantRoute;
        }

        if (
          resolvedRoute.absolutePath.indexOf(':') >= 0 &&
          params &&
          Object.keys(params).length > 0
        ) {
          // TODO: UNFUCK THIS AND IT'S TYPES THAT IT RODE IN ON TO SUPPORT ROUTERULEGENERATORS!!
          try {
            const generatedPath = generatePath(
              resolvedRoute.absolutePath,
              params as any
            );
            const rules = resolvedRoute.rules ?? [];
            // run rules if defined here as it is contextual to the params
            if (rules.length > 0) {
              const contextualRules = (rules.map((ruleTuple) => {
                const [ruleOrRules, redirect] = ruleTuple;
                if (typeof ruleOrRules === 'function') {
                  return [ruleOrRules(params as any) as any, redirect];
                }
                return [
                  (ruleOrRules.map((rule) =>
                    rule(params as any)
                  ) as any) as RouteRuleEvaluator<Ri>[],
                  redirect,
                ];
              }) as any) as RouteRule<Ri>[];

              const rulesResult = processRules(
                { ...state, ...variantState },
                contextualRules
              );
              if (rulesResult) return null;
            }

            return {
              ...resolvedRoute,
              absolutePath: generatedPath,
              path: generatedPath,
            };
          } catch (e) {
            return resolvedRoute;
          }
        }
        return resolvedRoute;
      },
      [keyMapping, state, variantState]
    );

    const redirectCheck = useCallback(
      (route: Route, params: Record<string, any>) => {
        console.log('redirectCheck', route, params);
        const resolvedRoute = keyMapping[route.key] as ProcessedRouteConfig<Ri>;

        console.log('resolved route', resolvedRoute);

        if (resolvedRoute.variants) {
          const dynamicRoute = resolvedRoute.variants({
            ...state,
            ...variantState,
          });
          const filteredVariant = resolvedRoute.variantFilter(
            dynamicRoute,
            params
          );

          // if there is no filteredVariant for the given params at the given route, then we redirect
          if (!filteredVariant) {
            // redirect to parent of route
            console.log(
              resolvedRoute.name +
                ' No filtered variant matched for this dynamic route, navigating up a level'
            );
            // TODO: Navigate to the parent of the route
            navigate('/');
          }
          console.log('filtered variant found!', filteredVariant);
        }

        //
        //
        /
        /
        /  This is where I'm currently at. Trying to get the redirect rule to process on a variant using the same logic that is in allowedRouteBySymbol
        /
        /
        /

        // TODO: move (+variant) redirect check to RouteManagerProviderFactory - will potentially require params as argument to invoke from here
        // if (route.variants) {
        //   // has variants
        //   const dynamicRoute = route.variants({
        //     ...state,
        //     ...variantState,
        //   });
        //   const filteredVariant = route.variantFilter(dynamicRoute, params);

        //   // if there is no filteredVariant for the given params at the given route, then we redirect
        //   if (!filteredVariant) {
        //     // redirect to parent of route
        //     console.log(
        //       route.name +
        //         ' No filtered variant matched for this dynamic route, navigating up a level'
        //     );
        //     // TODO: Navigate to the parent of the route
        //     navigate('/');
        //   }
        //   console.log('filtered variant found!', filteredVariant);
        // }

        const redirectRouteOrPath: string | symbol | null = processRules(
          {
            ...state,
            ...variantState,
          },
          route.rules
        );

        if (!redirectRouteOrPath) {
          return;
        }
        if (typeof redirectRouteOrPath === 'symbol') {
          const route = allowedRouteBySymbol(redirectRouteOrPath);

          if (!route) {
            console.log(
              'Did not resolve route as an allowed route, falling back to `/`. This could be a logic error in your ACL or route nesting.'
            );
            navigate('/');
            return;
          }
          navigate(route.absolutePath);
          return;
        }

        navigate(redirectRouteOrPath);
      },
      [allowedRouteBySymbol, keyMapping, navigate, state, variantState]
    );

    return (
      <Context.Provider
        value={{
          routes: routes,
          allowedRoutes,
          state: { ...state, ...variantState },
          setVariantState: handleSetVariantState,
          activeRoute,
          allowedRouteBySymbol,
          redirectCheck,
        }}
      >
        {RouterWrapper ? <RouterWrapper>{router}</RouterWrapper> : router}
      </Context.Provider>
    );
  };

  /**
   * useRouterProvider that provides the RouterProvider.
   *
   * It automatically detects if there is a Router already setup, if not then it wraps the Router in a BrowserProvider.
   * If the consuming application requires access to the browser router prior to the RouterProvider, then it can manually use the `BrowserProvider`.
   *
   */
  const useRouterProvider = ({
    RouterWrapper,
    state,
  }: RouteManagerProviderProps<Ri>): JSX.Element => {
    const wrappedOrUnwrappedRouter = useRef<JSX.Element>(null);
    if (wrappedOrUnwrappedRouter.current)
      return wrappedOrUnwrappedRouter.current;

    const routerProvider = (
      <RouterProvider state={state} RouterWrapper={RouterWrapper} />
    );
    try {
      useLocation();
      wrappedOrUnwrappedRouter.current = routerProvider;
    } catch (e) {
      wrappedOrUnwrappedRouter.current = (
        <BrowserProvider>{routerProvider}</BrowserProvider>
      );
    }
    return wrappedOrUnwrappedRouter.current;
  };
  return useRouterProvider;
};
