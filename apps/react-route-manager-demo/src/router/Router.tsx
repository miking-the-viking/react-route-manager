import { useAuth0 } from "@auth0/auth0-react";
import { BrowserProvider } from "@react-route-manager/react-route-manager";
import { AppLayout } from "@react-route-manager/ui-components";
import { AppState } from "@react-route-manager/ui-state";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { InnerBrowserRouterContext } from "./InnerBrowserRouterWrapper";
import { RouteManagerProvider } from "./route-manager.config";
import { routes } from "./routes";

const LoadingFallback = () => <p>Loading</p>;

type RouterProps = {
  Wrapper?: React.FC;
};

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
        localStorage.setItem("token", token);
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
        Wrapper={
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

export default () => (
  <BrowserProvider>
    <InnerBrowserRouterContext>
      <Router />
    </InnerBrowserRouterContext>
  </BrowserProvider>
);
