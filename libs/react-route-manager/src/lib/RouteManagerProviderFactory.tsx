/* eslint-disable react-hooks/rules-of-hooks */

import React, { useCallback, useEffect, useMemo, useState } from "react";
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
    // LoadingIndicator,
  }) => {
    const Context = RouteManagerContext as React.Context<RouteManagerState<Ri>>;
    const { pathname: path } = useLocation();
    const navigate = useNavigate();

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

    const router = (
      <IndexRouter
        // LoadingIndicator={LoadingIndicator}
        routes={inputRoutes}
      />
    );

    const allowedRoutes = useMemo(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      () => {
        console.log("allowedRoutes re processing");
        const processedRoutes = processRoutes<Ri>(routeState.routes, {
          ...state,
          ...variantState,
        });
        console.log("processed routes = ", processedRoutes);

        return processedRoutes;
      },
      [routeState, state, variantState]
    );

    const activeRoute = useMemo(() => {
      if (!allowedRoutes || allowedRoutes.length === 0) return null;

      return allowedRoutesActiveRoute<Ri>(allowedRoutes, path);
    }, [allowedRoutes, path]);

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
        }}
      >
        {Wrapper ? <Wrapper>{router}</Wrapper> : { router }}
      </Context.Provider>
    );
  };
  return dynamicProvider;
};
