/* eslint-disable react-hooks/rules-of-hooks */

import React from "react";
import { useState } from "react";
import { IndexRouter } from "./IndexRouter";
import { RouteManagerContext } from "./RouteManagerContext";
import { RouteManagerProviderProps } from "./types/RouteManagerProviderProps";
import { RouteManagerState } from "./types/RouteManagerState";

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

    return (
      <Context.Provider
        value={{
          routes: routeState.routes,
          setRoutes: (coreRoutes) => {
            setRouteState({
              routes: coreRoutes,
            });
          },
          //   evaluatedRoutes,
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
