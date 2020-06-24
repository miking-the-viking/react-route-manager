import React from 'react';
import { RouteManagerContext, RouteManagerProviderFactory } from '../lib/index';
import { SampleStoreState } from './sample.store.stub';
import { RouteManagerState } from '../lib/state';
import { CORE_ROUTES } from './routes.stub';
import { useSelector } from 'react-redux';

export const SampleAppRouteManagerContext = RouteManagerContext as React.Context<
  RouteManagerState<SampleStoreState>
>;

const RouteManagerProvider = RouteManagerProviderFactory<SampleStoreState>();

export const SampleAppRouteManagerContextProvider: React.FC = ({
  children,
}) => {
  const state = useSelector((state: SampleStoreState) => state);

  return (
    <RouteManagerProvider coreRoutes={CORE_ROUTES} state={state}>
      {children}
    </RouteManagerProvider>
  );
};
