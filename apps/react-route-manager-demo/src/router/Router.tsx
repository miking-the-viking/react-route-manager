import React, { useEffect } from "react";
import { AppLayout } from "@react-route-manager/ui-components";
import { RouteManagerProvider } from "./route-manager.config";
import { routes } from "./routes";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@react-route-manager/ui-state";
import { InnerBrowserRouterContext } from "./InnerBrowserRouterWrapper";
import { BrowserProvider } from "@react-route-manager/react-route-manager";

const LoadingFallback = () => <p>Loading</p>;

type RouterProps = {
  Wrapper?: React.FC;
};

const Router: React.FC<RouterProps> = ({ Wrapper }) => {
  const dispatch = useDispatch();
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
    console.log("error", error);
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    console.log("LOADING AUTH0");
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
// export default Router;
