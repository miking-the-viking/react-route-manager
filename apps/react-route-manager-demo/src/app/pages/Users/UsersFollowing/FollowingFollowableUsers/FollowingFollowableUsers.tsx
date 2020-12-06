import { useAuth0 } from "@auth0/auth0-react";
import { Button, Code, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import {
  useFollowUserMutation,
  useOtherUsersQuery,
} from "@react-route-manager/hooks-api";
import { RouterMetaWrap } from "@react-route-manager/react-route-manager";
import { apolloClient } from "@react-route-manager/ui-components";
import React, { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { UsersContext } from "../../UsersContext";
import { FOLLOWING_FOLLOWABLE_USERS } from "./FollowingFollowableUsers.route";

const FollowingFollowableUsers: React.FC = () => {
  const { user } = useAuth0();

  const { following, reloadFollowing } = useContext(UsersContext);

  const [followUserMutation] = useFollowUserMutation({
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
        <Heading>Followable Users</Heading>
        <Text fontSize="lg">
          This route <Code>/users/following/followable</Code> is used to list
          users that I can follow.
        </Text>
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
      {(!followableUsers || followableUsers.length === 0) && (
        <GridItem>
          <p>
            It appears that there are no other users who you can follow. You've
            either followed everyone or there is no-one else registered .
          </p>
          <p>
            Visit the <Link to={"/users/following/"}>Followed Users page</Link>{" "}
            to see the users you're following.
          </p>
        </GridItem>
      )}
    </Grid>
  );
};

export default RouterMetaWrap(
  FOLLOWING_FOLLOWABLE_USERS,
  FollowingFollowableUsers
);
