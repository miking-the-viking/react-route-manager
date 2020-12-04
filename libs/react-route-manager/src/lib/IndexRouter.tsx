import React, { Suspense } from "react";
import { Navigate, PartialRouteObject, useRoutes } from "react-router";
import { RouteConfig } from "./types/RouteConfig";
import { RouteManagerProviderProps } from "./types/RouteManagerProviderProps";

export const AsyncComponent: React.FC<Pick<
  RouteConfig<Record<string, unknown>>,
  "lazyLoadedComponent"
>> = ({ lazyLoadedComponent: Component, ...props }) => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Component {...props} />
    </Suspense>
  );
};

const generateRoutes = (
  routes: RouteConfig<Record<string, unknown>>[]
): PartialRouteObject[] => {
  return routes.map(
    ({ name, description, path, lazyLoadedComponent, children }) => ({
      element: <AsyncComponent lazyLoadedComponent={lazyLoadedComponent} />,
      children: children && generateRoutes(children),
      path,
    })
  );
};

const AppRouter: React.FC<{ routes: PartialRouteObject[] }> = ({ routes }) => {
  const Router = useRoutes(routes);
  return Router;
};

export const IndexRouter: React.FC<Pick<
  RouteManagerProviderProps<Record<string, unknown>>,
  "routes"
>> = ({ routes }) => {
  const r = [
    ...generateRoutes(routes), // Todo: sensible fallback or computed "to" value?
    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ];
  return <AppRouter routes={r} />;
};
