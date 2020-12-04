import { Box, Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import React, { useCallback, useEffect, useMemo } from "react";
import { RouterMetaWrap } from "@react-route-manager/react-route-manager";
import { FOLLOWING_INDEX } from "./FollowingIndex.route";

import {
  useFollowUserMutation,
  useOtherUsersQuery,
  useUnfollowUserMutation,
  useUserFollowersLazyQuery,
  useUserFollowersQuery,
  useUserFollowingLazyQuery,
} from "@react-route-manager/hooks-api";
import { useAuth0 } from "@auth0/auth0-react";
import { apolloClient } from "@react-route-manager/ui-components";
import { isCompositeType } from "graphql";

const FollowingIndex: React.FC = () => {
  const { user } = useAuth0();

  const [
    unfollowUserMutation,
    { data, loading: loadingUnfollowUser, error },
  ] = useUnfollowUserMutation({
    client: apolloClient,
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

  const unfollowUserAndReloadFollowing = useCallback(
    async (userId: string) => {
      await unfollowUserMutation({
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
    [unfollowUserMutation, user, fetchMore]
  );

  return (
    <Grid>
      {following &&
        following.followers.map((u) => {
          const {
            id,
            email,
            name,
            followers_aggregate: {
              aggregate: { count: followers_count },
            },
            following_aggregate: {
              aggregate: { count: following_count },
            },
          } = u.following;
          return (
            <GridItem key={id}>
              <Button
                onClick={() => {
                  unfollowUserAndReloadFollowing(id);
                }}
              >
                Unfollow
              </Button>
              {id} - {email} - {name} - followers: {followers_count}, following:{" "}
              {following_count}
            </GridItem>
          );
        })}
    </Grid>
  );
};

export default RouterMetaWrap(FOLLOWING_INDEX, FollowingIndex);
