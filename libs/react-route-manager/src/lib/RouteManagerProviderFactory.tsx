/* eslint-disable react-hooks/rules-of-hooks */

import React, { useCallback, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IndexRouter } from './IndexRouter';
import { RouteManagerContext } from './RouteManagerContext';
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
export const RouteManagerProviderFactory: <R extends Record<
  string,
  unknown
>>() => React.FC<RouteManagerProviderProps<R>> = <
  Ri extends Record<string, unknown>
>() => {
  /**
   * RouteManagerProvider
   *
   */
  const dynamicProvider: React.FC<RouteManagerProviderProps<Ri>> = ({
    RouterWrapper,
    state,
    routes: inputRoutes,
  }) => {
    const Context = RouteManagerContext as React.Context<RouteManagerState<Ri>>;
    const { pathname: path } = useLocation();

    const [variantState, setVariantState] = useState<Record<string, any>>({});

    const [routeState, setRouteState] = useState<
      Pick<RouteManagerState<Ri>, 'routes'>
    >({
      routes: inputRoutes,
    });

    const router = <IndexRouter routes={inputRoutes} />;

    const handleSetVariantState = useCallback(
      (key: string, value: any) =>
        setVariantState((currentState) => ({ ...currentState, [key]: value })),
      [setVariantState]
    );

    const [keyMapping, allowedRoutes] = useMemo(
      () =>
        processRoutes<Ri>(
          routeState.routes,
          {
            ...state,
            ...variantState,
          },
          '/'
        ),
      [routeState, state, variantState]
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
          )?.absolutePath;
        }
        return resolvedRoute;
      },
      [keyMapping]
    );

    return (
      <Context.Provider
        value={{
          routes: routeState.routes,
          setRoutes: (coreRoutes) => {
            setRouteState({
              routes: coreRoutes,
            });
          },
          allowedRoutes,
          state: { ...state, ...variantState },
          setVariantState: handleSetVariantState,
          activeRoute,
          allowedRouteBySymbol,
        }}
      >
        {RouterWrapper ? <RouterWrapper>{router}</RouterWrapper> : { router }}
      </Context.Provider>
    );
  };
  return dynamicProvider;
};
