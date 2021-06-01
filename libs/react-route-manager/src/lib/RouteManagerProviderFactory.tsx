/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BrowserProvider } from './BrowserProvider';
import { IndexRouter } from './IndexRouter';
import { RouteManagerContext } from './RouteManagerContext';
import { Route } from './types/Route';
import { RouteManagerProviderProps } from './types/RouteManagerProviderProps';
import { RouteManagerState } from './types/RouteManagerState';
import { allowedRoutesActiveRoute } from './utils/allowedRoutesActiveRoute';
import { processRoutes } from './utils/processRoutes';

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
      [routes, state, variantState]
    );

    const activeRoute = useMemo(() => {
      if (!allowedRoutes || allowedRoutes.length === 0) return null;

      return allowedRoutesActiveRoute<Ri>(allowedRoutes, path);
    }, [allowedRoutes, path]);

    const allowedRouteBySymbol = useCallback(
      (key: symbol, params?: Record<string, unknown>) => {
        const resolvedRoute = keyMapping[key];

        if (!resolvedRoute) return null;

        // if a variant, then we need to retrieve the correct variant.
        if (resolvedRoute.variantFilter) {
          return resolvedRoute.variantFilter(
            resolvedRoute.processedVariants,
            params
          );
        }
        return resolvedRoute;
      },
      [keyMapping]
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
