import { useAuth0 } from '@auth0/auth0-react';
import { Button, Code, Grid, GridItem, Heading, Text } from '@chakra-ui/react';
import {
  UserCompleteFragment,
  useUnfollowUserMutation,
} from '@react-route-manager/hooks-api';
import { useRouteManagerContext } from '@react-route-manager/react-route-manager';
import { apolloClient } from '@react-route-manager/ui-components';
import { FollowState } from '../../../../router/hooks/useFollowState';
import React from 'react';
import { Link } from 'react-router-dom';
import { FOLLOWING_FOLLOWABLE_USERS } from '../FollowingFollowableUsers/FollowingFollowableUsers.route';
import { FOLLOWING_PROFILE } from '../FollowingProfile/FollowingProfile.route';

const FollowingIndex: React.FC = () => {
  const { user } = useAuth0();

  const {
    allowedRouteBySymbol,
    state: { following },
  } = useRouteManagerContext<FollowState>();

  const [unfollowUserMutation] = useUnfollowUserMutation({
    client: apolloClient,
  });

  const { absolutePath: followableUrl } = allowedRouteBySymbol(
    FOLLOWING_FOLLOWABLE_USERS
  );

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
        following
          .map((u) => {
            const route = allowedRouteBySymbol(FOLLOWING_PROFILE, {
              id: u.id,
            });

            if (!route) {
              return undefined;
            }
            return FollowedUserGridItem(
              u,
              unfollowUserMutation,
              user?.sub,
              route.absolutePath
            );
          })
          .filter((u) => u != null)}
      {!(following?.length !== 0) && NoFollowableUsers(followableUrl)}
    </Grid>
  );
};

const FollowedUserGridItem = (
  followableUser: UserCompleteFragment,
  unfollowUserMutation,
  userId,
  path
) => {
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
  } = followableUser;

  return (
    <GridItem key={id}>
      <Button
        onClick={() => {
          unfollowUserMutation({
            variables: {
              userId: id,
              followerId: userId,
            },
          });
        }}
      >
        Unfollow
      </Button>
      <Link to={`${path}`}>
        {id} - {email} - {name} - followers: {followers_count}, following:{' '}
        {following_count}
      </Link>
    </GridItem>
  );
};

const NoFollowableUsers = (followableUrl: string) => (
  <>
    <p>It appears as though are are not following anyone!</p>
    <p>
      Check out our <Link to={followableUrl}>Followable Users Page</Link> and
      try following some! This will automagically update the Nav to have their
      profile links.
    </p>
  </>
);

export default FollowingIndex;
