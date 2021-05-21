import { RouteManagerProviderFactory } from '@react-route-manager/react-route-manager';
import { AppLayout } from '@react-route-manager/ui-components';
import React from 'react';
import { RouterState } from './RouterState.type';
import { routes } from './routes';
import { useRouterState } from './useRouterState';

type RouterProps = {
  Wrapper?: React.FC;
};

const RouteManagerProvider = RouteManagerProviderFactory<RouterState>(routes);

const Router: React.FC<RouterProps> = ({ Wrapper }) => {
  const state = useRouterState();
  return (
    <RouteManagerProvider
      state={state}
      RouterWrapper={({ children }) => (
        <AppLayout hideNav={!state.authenticated}>{children}</AppLayout>
      )}
    />
  );
};

export default Router;
