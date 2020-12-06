import { useAuth0 } from "@auth0/auth0-react";
import { Button, Grid, GridItem } from "@chakra-ui/react";
import { useUnfollowUserMutation } from "@react-route-manager/hooks-api";
import { RouterMetaWrap } from "@react-route-manager/react-route-manager";
import { apolloClient } from "@react-route-manager/ui-components";
import React, { useContext } from "react";
import { UsersContext } from "../../UsersContext";
import { FOLLOWING_INDEX } from "./FollowingIndex.route";

const FollowingIndex: React.FC = () => {
  const { user } = useAuth0();

  const { following, reloadFollowing } = useContext(UsersContext);

  const [
    unfollowUserMutation,
    { data, loading: loadingUnfollowUser, error },
  ] = useUnfollowUserMutation({
    client: apolloClient,
    onCompleted: (data) => {
      reloadFollowing();
    },
  });

  return (
    <Grid>
      {following &&
        following.map((u) => {
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
                  unfollowUserMutation({
                    variables: {
                      userId: id,
                      followerId: user?.sub,
                    },
                  });
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
