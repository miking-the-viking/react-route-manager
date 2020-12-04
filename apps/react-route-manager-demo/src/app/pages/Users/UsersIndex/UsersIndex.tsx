import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useMemo } from "react";
import {
  RouterMetaWrap,
  useRouteManagerContext,
} from "@react-route-manager/react-route-manager";
import { USERS } from "../Users.route";

import {
  useFollowUserMutation,
  useOtherUsersQuery,
  useUserFollowersLazyQuery,
  useUserFollowersQuery,
  useUserFollowingLazyQuery,
} from "@react-route-manager/hooks-api";
import { useAuth0 } from "@auth0/auth0-react";
import { apolloClient } from "@react-route-manager/ui-components";
import { isCompositeType } from "graphql";

const UsersIndex: React.FC = () => {
  const { user } = useAuth0();

  const { setVariantState } = useRouteManagerContext();

  const [
    followUserMutation,
    { data, loading: loadingFollowUser, error },
  ] = useFollowUserMutation({
    client: apolloClient,
  });

  const { loading: loadingOtherUsers, data: otherUsers } = useOtherUsersQuery({
    client: apolloClient,
    variables: {
      userId: user?.sub,
    },
  });

  const [
    loadFollowing,
    { loading: loadingFollowingUsers, data: following, fetchMore },
  ] = useUserFollowingLazyQuery({
    client: apolloClient,
  });

  useEffect(() => {
    if (!user?.sub) return;
    loadFollowing({
      variables: {
        userId: user?.sub,
      },
    });
  }, [user, loadFollowing]);

  useEffect(() => {
    console.log("setVariantState", setVariantState);
    if (!setVariantState || !following?.followers) return;
    console.log("Following", following);
    setVariantState("following", following.followers);
  }, [following, setVariantState]);

  const followableUsers = useMemo(() => {
    const currentlyFollowingIds = following?.followers.map(
      (u) => u.following.id
    );
    return otherUsers?.users.filter(
      (otherUser) => !currentlyFollowingIds?.includes(otherUser.id)
    );
  }, [following, otherUsers]);

  const followUserAndReloadFollowers = useCallback(
    async (userId: string) => {
      await followUserMutation({
        variables: {
          userId: userId,
          followerId: user?.sub,
        },
      });
      fetchMore({
        variables: {
          userId: user?.sub,
        },
      });
    },
    [followUserMutation, user, fetchMore]
  );

  if (loadingOtherUsers || loadingFollowingUsers) {
    return <p>Loading user data</p>;
  }

  return (
    <Grid>
      <GridItem>
        <Heading variant={"h3"}>Followable Users</Heading>
      </GridItem>
      {followableUsers &&
        followableUsers.map((u) => (
          <GridItem key={u.id}>
            <Button
              onClick={() => {
                followUserAndReloadFollowers(u.id);
              }}
            >
              Follow
            </Button>
            {u.id} - {u.email} - {u.name} - followers:{" "}
            {u.followers_aggregate.aggregate.count}, following:{" "}
            {u.following_aggregate.aggregate.count}
          </GridItem>
        ))}
    </Grid>
  );
};

export default RouterMetaWrap(USERS, UsersIndex);
