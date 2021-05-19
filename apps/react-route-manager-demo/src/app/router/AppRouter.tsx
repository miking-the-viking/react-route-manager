import { useAuth0 } from '@auth0/auth0-react';
import { RouteManagerProviderFactory } from '@react-route-manager/react-route-manager';
import { AppLayout } from '@react-route-manager/ui-components';
import { AppState } from '@react-route-manager/ui-state';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RouterState } from './RouterState.type';
import { routes } from './routes';

const LoadingFallback = () => <p>Loading</p>;

type RouterProps = {
  Wrapper?: React.FC;
  RoutableWrapper?: React.FC;
};

const RouteManagerProvider = RouteManagerProviderFactory<RouterState>();

const Router: React.FC<RouterProps> = ({ Wrapper }) => {
  const state = useSelector((state: AppState) => state);

  const {
    getAccessTokenSilently,
    isAuthenticated,
    isLoading,
    error,
  } = useAuth0();

  useEffect(() => {
    (async () => {
      let token;
      if (isAuthenticated) {
        token = await getAccessTokenSilently();
      }
      if (token && token.length > 0) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem(token);
      }
    })();
  }, [isAuthenticated, getAccessTokenSilently]);

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <LoadingFallback />;
  }
  return (
    <>
      {/* <LoadingBar show={state.System.loading || isLoading} /> */}

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
    </>
  );
};

export default () => <Router />;
