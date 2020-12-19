import { useAuth0 } from "@auth0/auth0-react";
import { Button, Code, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import {
  useFollowableUsersSubscription,
  useFollowUserMutation,
  useOtherUsersQuery,
} from "@react-route-manager/hooks-api";
import {
  RouterMetaWrap,
  useRouteManagerContext,
} from "@react-route-manager/react-route-manager";
import { apolloClient } from "@react-route-manager/ui-components";
import React, { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { UsersContext } from "../../UsersContext";
import { FOLLOWING_INDEX } from "../FollowingIndex/FollowingIndex.route";
import { FOLLOWING_FOLLOWABLE_USERS_ROUTE } from "./FollowingFollowableUsers.route";

const FollowingFollowableUsers: React.FC = () => {
  const { user } = useAuth0();
  const { allowedRouteBySymbol } = useRouteManagerContext();
  const { following } = useContext(UsersContext);

  const { absolutePath: followingUrl } = allowedRouteBySymbol(FOLLOWING_INDEX);

  const [followUserMutation] = useFollowUserMutation({
    client: apolloClient,
  });

  const { data: followableUsers } = useFollowableUsersSubscription({
    client: apolloClient,
    fetchPolicy: "cache-first",
    variables: {
      userId: user?.sub,
    },
    shouldResubscribe: true,
  });

  return (
    <Grid>
      <GridItem>
        <Heading>Followable Users</Heading>
        <Text fontSize="lg">
          This route <Code>/users/following/followable</Code> is used to list
          users that I can follow.
        </Text>
      </GridItem>
      {followableUsers?.users &&
        followableUsers.users.map((u) => (
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
      {(!followableUsers?.users || followableUsers.users.length === 0) && (
        <GridItem>
          <p>
            It appears that there are no other users who you can follow. You've
            either followed everyone or there is no-one else registered .
          </p>
          <p>
            Visit the
            <Link to={followingUrl}>Followed Users page</Link> to see the users
            you're following.
          </p>
        </GridItem>
      )}
    </Grid>
  );
};

export default RouterMetaWrap(
  FOLLOWING_FOLLOWABLE_USERS_ROUTE,
  FollowingFollowableUsers
);
