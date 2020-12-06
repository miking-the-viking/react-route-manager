import { useAuth0 } from "@auth0/auth0-react";
import { Button, Grid, GridItem, Heading } from "@chakra-ui/react";
import {
  useFollowUserMutation,
  useOtherUsersQuery,
} from "@react-route-manager/hooks-api";
import { RouterMetaWrap } from "@react-route-manager/react-route-manager";
import { apolloClient } from "@react-route-manager/ui-components";
import React, { useContext, useMemo } from "react";
import { USERS } from "../Users.route";
import { UsersContext } from "../UsersContext";

const UsersIndex: React.FC = () => {
  const { user } = useAuth0();

  const { following, reloadFollowing } = useContext(UsersContext);

  const [
    followUserMutation,
    { data, loading: loadingFollowUser, error },
  ] = useFollowUserMutation({
    client: apolloClient,
    onCompleted: (data) => {
      reloadFollowing();
    },
  });

  const { loading: loadingOtherUsers, data: otherUsers } = useOtherUsersQuery({
    client: apolloClient,
    variables: {
      userId: user?.sub,
    },
  });

  const followableUsers = useMemo(() => {
    const currentlyFollowingIds = following?.map((u) => u.following.id);
    return otherUsers?.users.filter(
      (otherUser) => !currentlyFollowingIds?.includes(otherUser.id)
    );
  }, [following, otherUsers]);

  if (loadingOtherUsers) {
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
                followUserMutation({
                  variables: {
                    userId: u.id,
                    followerId: user?.sub,
                  },
                });
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
