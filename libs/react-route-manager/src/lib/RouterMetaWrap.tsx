import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import { useRouteManagerContext } from './hooks';
import { Route } from './types/Route';
import { processRules } from './utils/processRules';

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
  const { state } = useRouteManagerContext();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  const redirectPath: string | null = processRules(state, route.rules);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (redirectPath) {
      navigate(redirectPath);
    }
  }, []);

  const HelmetWrappedComponent = () => (
    <>
      <Helmet>
        <title>{route.name}</title>
        <meta
          name="description"
          content={route.description ?? 'Some Badass Page'}
        />
      </Helmet>
      <Component />
    </>
  );

  return <HelmetWrappedComponent />;
};
