import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useRouteRedirectCheck } from './hooks';
import { Route } from './types/Route';

/**
 * RouterMetaWrap is a function used to bind the Route configuration object to its Page component.
 *
 * This handles applying any automatic redirect rules as necessary, defined by the Route config.
 *
 *
 * @param route
 * @param Component
 * @param Wrapper Optional wrapper than can enclose the page component for more specific page context.
 */
export const RouterMetaWrap = (route: Route<any>, Component: any) => () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const loadingState = useRouteRedirectCheck(route);

  const HelmetWrappedComponent = () => (
    <>
      <Helmet>
        <title>{route.name}</title>
      </Helmet>
      {/* Must not render the component unless the useRouteRedirectCheck returns true */}
      {loadingState ? <Component /> : null}
    </>
  );

  return <HelmetWrappedComponent />;
};
