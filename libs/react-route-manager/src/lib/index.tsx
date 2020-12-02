/* eslint-disable react-hooks/rules-of-hooks */

import React, { useMemo } from "react";
import { useState } from "react";
import BrowserProvider from "./BrowserProvider";
import { IndexRouter } from "./IndexRouter";
import { RouteManagerContext } from "./RouteManagerContext";
import { RouteManagerProviderProps } from "./types/RouteManagerProviderProps";
import { RouteManagerState } from "./types/RouteManagerState";
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
    LoadingIndicator,
  }) => {
    const Context = RouteManagerContext as React.Context<RouteManagerState<Ri>>;

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

    const allowedRoutes = useMemo(() => {
      const { routes } = routeState;
      console.log("to evaluate for allowance: ", routes);
      return processRoutes<any>(routes, {} as any);
    }, [routeState]);

    console.log("allowedRoutes = ", allowedRoutes);
    console.log("Wrapper = ", Wrapper);

    // If there is a Wrapper, then

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
          state,
          //   activeRoute,
        }}
      >
        {Wrapper ? <Wrapper>{router}</Wrapper> : { router }}
      </Context.Provider>
    );
  };
  return dynamicProvider;
};
