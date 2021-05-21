import React, { Suspense } from 'react';
import { Navigate, PartialRouteObject, useRoutes } from 'react-router';
import { Route } from './types/Route';
import { RouteManagerProviderProps } from './types/RouteManagerProviderProps';

const AsyncComponent: React.FC<Pick<
  Route<Record<string, unknown>>,
  'lazyLoadedComponent'
>> = ({ lazyLoadedComponent: Component, ...props }) => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Component {...props} />
    </Suspense>
  );
};

const generateRoutes = (
  routes: Route<Record<string, unknown>>[]
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

export const IndexRouter: React.FC<{
  routes: Route<any>[];
}> = ({ routes }) => {
  const r = [
    ...generateRoutes(routes), // Todo: sensible fallback or computed "to" value?
    {
      path: '*',
      element: <Navigate to="/" />,
    },
  ];
  return <AppRouter routes={r} />;
};
