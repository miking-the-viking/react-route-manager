/* eslint-disable react-hooks/rules-of-hooks */
import { RouteManagerProviderFactory } from '@react-route-manager/react-route-manager';
import { AppLayout } from '@react-route-manager/ui-components';
import React from 'react';
import { useFollowState } from './hooks/useFollowState';
import { RouterState } from './Router.state';
import { routes } from './routes';
import { useRouterState } from './useRouterState';

type RouterProps = {
  Wrapper?: React.FC;
};

const RouteManagerProvider = RouteManagerProviderFactory<RouterState>(routes);

const RouterWrapper = (authenticated: boolean) => ({ children }) => {
  useFollowState();
  return <AppLayout hideNav={!authenticated}>{children}</AppLayout>;
};

const Router: React.FC<RouterProps> = ({ Wrapper }) => {
  const state = useRouterState();

  return (
    <RouteManagerProvider
      state={state}
      RouterWrapper={RouterWrapper(state.authenticated)}
    />
  );
};

export default Router;
