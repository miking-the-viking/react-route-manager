import { useAuth0 } from '@auth0/auth0-react';
import { Button, Code, Grid, GridItem, Heading, Text } from '@chakra-ui/react';
import {
  useFollowerUsersSubscription,
  useFollowUserMutation,
  UserCompleteFragment,
} from '@react-route-manager/hooks-api';
import { useRouteManagerContext } from '@react-route-manager/react-route-manager';
import { apolloClient } from '@react-route-manager/ui-components';
import React, { useEffect } from 'react';

export type FollowingMeVariantState = { followers?: UserCompleteFragment[] };

const FollowingMe: React.FC = () => {
  const { user } = useAuth0();
  const {
    // allowedRouteBySymbol,
    state: { followers },
    setVariantState,
  } = useRouteManagerContext<FollowingMeVariantState>();

  // const { absolutePath: followingUrl } = allowedRouteBySymbol(FOLLOWING_INDEX);

  // const [followUserMutation] = useFollowUserMutation({
  //   client: apolloClient,
  // });
  const { data: followerData, loading } = useFollowerUsersSubscription({
    client: apolloClient,
    fetchPolicy: 'no-cache',
    variables: {
      userId: user?.sub,
    },
    shouldResubscribe: true,
  });

  useEffect(() => {
    if (loading || !followerData?.users) return;
    const sameLength = followers?.length === followerData.users.length;
    // if the data is the same as followers, do nothing
    if (
      sameLength &&
      followerData.users.filter((f) => !followers.find((fi) => fi.id === f.id))
        .length === 0
    ) {
      return;
    }

    setVariantState('followers', followerData.users);
  }, [followers, followerData, loading, setVariantState]);

  return (
    <Grid>
      <GridItem>
        <Heading>My Followers</Heading>
        <Text fontSize="lg">
          This route <Code>/users/following/following</Code> is used to list
          users that are following me.
        </Text>
      </GridItem>
      {followers &&
        followers.map((u) => (
          <GridItem key={u.id}>
            {/* <Button
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
            </Button> */}
            {u.id} - {u.email} - {u.name} - followers:{' '}
            {u.followers_aggregate.aggregate.count}, following:{' '}
            {u.following_aggregate.aggregate.count}
          </GridItem>
        ))}
      {!followers ||
        (followers.length === 0 && (
          <GridItem>
            <p>It appears that there no are users following you.</p>
          </GridItem>
        ))}
    </Grid>
  );
};

export default FollowingMe;
