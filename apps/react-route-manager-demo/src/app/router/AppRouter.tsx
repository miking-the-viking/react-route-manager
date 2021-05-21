import { useAuth0 } from '@auth0/auth0-react';
import { RouteManagerProviderFactory } from '@react-route-manager/react-route-manager';
import {
  AppLayout,
  RequiresKnownAuthStateWrapper,
} from '@react-route-manager/ui-components';
import { AppState } from '@react-route-manager/ui-state';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RouterState } from './RouterState.type';
import { routes } from './routes';

type RouterProps = {
  Wrapper?: React.FC;
  RoutableWrapper?: React.FC;
};

const RouteManagerProvider = RouteManagerProviderFactory<RouterState>();

const Router: React.FC<RouterProps> = ({ Wrapper }) => {
  const state = useSelector((state: AppState) => state);
  const { isAuthenticated } = useAuth0();
  return (
    <RequiresKnownAuthStateWrapper>
      <RouteManagerProvider
        routes={routes}
        state={{ ...state, authenticated: isAuthenticated }}
        RouterWrapper={
          Wrapper
            ? Wrapper
            : ({ children }) => (
                <AppLayout hideNav={!isAuthenticated}>{children}</AppLayout>
              )
        }
      />
    </RequiresKnownAuthStateWrapper>
  );
};

export default () => <Router />;
