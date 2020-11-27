import React from "react";
import { RouteManagerProvider } from "./route-manager.config";
import { routes } from "./routes";

const LoadingFallback = () => <p>Loading</p>;

const IndexRouter = () => {
  //   const dispatch = useDispatch();
  //   const state = useSelector((state: AppState) => state);

  //   const {
  //     getAccessTokenSilently,
  //     isAuthenticated,
  //     isLoading,
  //     error,
  //   } = useAuth0();

  //   useEffect(() => {
  //     (async () => {
  //       let token;
  //       if (isAuthenticated) {
  //         token = await getAccessTokenSilently();
  //       }
  //       if (token && token.length > 0) {
  //         localStorage.setItem('token', token);
  //       } else {
  //         localStorage.removeItem(token);
  //       }
  //     })();
  //   }, [isAuthenticated, getAccessTokenSilently, dispatch]);

  //   if (error) {
  //     return <div>Oops... {error.message}</div>;
  //   }

  //   if (isLoading) {
  //     return <LoadingFallback />;
  //   }

  return (
    <>
      {/* <LoadingBar show={state.System.loading || isLoading} /> */}

      <RouteManagerProvider
        routes={routes}
        state={{}}
        Wrapper={({ children }) => (
          // <AppLayout hideNav={!isAuthenticated}>{children}</AppLayout>
          <div>{children}</div>
        )}
      />
    </>
  );
};

export default IndexRouter;
