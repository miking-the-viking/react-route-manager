import { useAuth0 } from "@auth0/auth0-react";
import { Button, Code, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { useUnfollowUserMutation } from "@react-route-manager/hooks-api";
import { RouterMetaWrap } from "@react-route-manager/react-route-manager";
import { apolloClient } from "@react-route-manager/ui-components";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UsersContext } from "../../UsersContext";
import { FOLLOWING_INDEX } from "./FollowingIndex.route";

const FollowingIndex: React.FC = () => {
  const { user } = useAuth0();

  const { following, reloadFollowing } = useContext(UsersContext);

  const [unfollowUserMutation] = useUnfollowUserMutation({
    client: apolloClient,
    onCompleted: (data) => {
      reloadFollowing();
    },
  });

  return (
    <Grid>
      <GridItem>
        <Heading>Users Index</Heading>
        <Text fontSize="lg">
          This route <Code>/users/following/</Code> is the main Index route for
          the UsersFollowing route. <Code>/users</Code>.
        </Text>
      </GridItem>

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
              <Link to={`/users/following/profile/${id}`}>
                {id} - {email} - {name} - followers: {followers_count},
                following: {following_count}
              </Link>
            </GridItem>
          );
        })}
      {!(following?.length !== 0) && (
        <>
          <p>It appears as though are are not following anyone!</p>
          <p>
            Check out our{" "}
            <Link to={"/users/following/followable"}>
              Followable Users Page
            </Link>{" "}
            and try following some! This will automagically update the Nav to
            have their profile links.
          </p>
        </>
      )}
    </Grid>
  );
};

export default RouterMetaWrap(FOLLOWING_INDEX, FollowingIndex);
