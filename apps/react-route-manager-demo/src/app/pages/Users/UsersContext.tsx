import { useAuth0 } from "@auth0/auth0-react";
import {
  UserFollowingQuery,
  useUserFollowingLazyQuery,
} from "@react-route-manager/hooks-api";
import { useRouteManagerContext } from "@react-route-manager/react-route-manager";
import { apolloClient } from "@react-route-manager/ui-components";
import React, { useCallback, useEffect } from "react";

type UsersContextualState = {
  reloadFollowing: () => void;
  following: UserFollowingQuery["followers"];
};

export const UsersContext = React.createContext<UsersContextualState>({
  reloadFollowing: () => {
    //
  },
  following: [],
});

export const UsersContextConsumer = UsersContext.Consumer;

export const UsersContextualWrapper: React.FC = ({ children }) => {
  const { user } = useAuth0();

  const { setVariantState } = useRouteManagerContext();

  const [
    loadFollowing,
    { data: following, fetchMore: refetchFollowing },
  ] = useUserFollowingLazyQuery({
    client: apolloClient,
  });

  const reloadFollowing = useCallback(() => {
    if (!user?.sub) return;
    refetchFollowing({
      variables: {
        userId: user?.sub,
      },
    });
  }, [user, refetchFollowing]);

  useEffect(() => {
    if (!user?.sub) return;
    loadFollowing({
      variables: {
        userId: user?.sub,
      },
    });
  }, [user, loadFollowing]);

  useEffect(() => {
    if (!setVariantState || !following?.followers) return;
    setVariantState("following", following.followers);
  }, [following, setVariantState]);

  return (
    <UsersContext.Provider
      value={{
        reloadFollowing,
        following: following?.followers,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
