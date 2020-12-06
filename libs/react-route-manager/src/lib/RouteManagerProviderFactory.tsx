/* eslint-disable react-hooks/rules-of-hooks */

import { resolve } from "path";
import React, { useCallback, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IndexRouter } from "./IndexRouter";
import { RouteManagerContext } from "./RouteManagerContext";
import { RouteManagerProviderProps } from "./types/RouteManagerProviderProps";
import { RouteManagerState } from "./types/RouteManagerState";
import { allowedRoutesActiveRoute } from "./utils/allowedRoutesActiveRoute";
import { processRoutes } from "./utils/processRoutes";

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
  const dynamicProvider: React.FC<RouteManagerProviderProps<Ri>> = ({
    Wrapper,
    state,
    routes: inputRoutes,
  }) => {
    const Context = RouteManagerContext as React.Context<RouteManagerState<Ri>>;
    const { pathname: path } = useLocation();

    const [variantState, setVariantState] = useState<Record<string, any>>({});
    const handleSetVariantState = useCallback(
      (key: string, value: any) =>
        setVariantState((currentState) => ({ ...currentState, [key]: value })),
      [setVariantState]
    );

    const [routeState, setRouteState] = useState<
      Pick<RouteManagerState<Ri>, "routes">
    >({
      routes: inputRoutes,
    });

    const router = <IndexRouter routes={inputRoutes} />;

    const [keyMapping, allowedRoutes] = useMemo(
      () =>
        processRoutes<Ri>(
          routeState.routes,
          {
            ...state,
            ...variantState,
          },
          "/"
        ),
      [routeState, state, variantState]
    );

    const activeRoute = useMemo(() => {
      if (!allowedRoutes || allowedRoutes.length === 0) return null;

      return allowedRoutesActiveRoute<Ri>(allowedRoutes, path);
    }, [allowedRoutes, path]);

    const routeBySymbol = useCallback(
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
        console.log(
          `Route Symbol ${key.toString()} resolved to path ${
            resolvedRoute?.absolutePath
          }`
        );
        return resolvedRoute?.absolutePath;
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
          routeBySymbol,
        }}
      >
        {Wrapper ? <Wrapper>{router}</Wrapper> : { router }}
      </Context.Provider>
    );
  };
  return dynamicProvider;
};
