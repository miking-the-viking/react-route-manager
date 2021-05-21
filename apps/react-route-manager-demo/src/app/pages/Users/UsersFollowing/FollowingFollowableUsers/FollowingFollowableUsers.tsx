import { useAuth0 } from '@auth0/auth0-react';
import { Button, Code, Grid, GridItem, Heading, Text } from '@chakra-ui/react';
import {
  useFollowableUsersSubscription,
  useFollowUserMutation,
  UserCompleteFragment,
} from '@react-route-manager/hooks-api';
import { useRouteManagerContext } from '@react-route-manager/react-route-manager';
import { apolloClient } from '@react-route-manager/ui-components';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FOLLOWING_INDEX } from '../FollowingIndex/FollowingIndex.route';

export type FollowableVariantState = { followable?: UserCompleteFragment[] };

const FollowingFollowableUsers: React.FC = () => {
  const { user } = useAuth0();
  const {
    allowedRouteBySymbol,
    state: { followable },
    setVariantState,
  } = useRouteManagerContext<FollowableVariantState>();

  const { absolutePath: followingUrl } = allowedRouteBySymbol(FOLLOWING_INDEX);

  const [followUserMutation] = useFollowUserMutation({
    client: apolloClient,
  });
  const { data: followableData, loading } = useFollowableUsersSubscription({
    client: apolloClient,
    fetchPolicy: 'no-cache',
    variables: {
      userId: user?.sub,
    },
    shouldResubscribe: true,
  });

  useEffect(() => {
    if (loading || !followableData?.users) return;
    const sameLength = followable?.length === followableData.users.length;
    // if the data is the same as followable, do nothing
    if (
      sameLength &&
      followableData.users.filter(
        (f) => !followable.find((fi) => fi.id === f.id)
      ).length === 0
    ) {
      return;
    }

    setVariantState('followable', followableData.users);
  }, [followable, followableData, loading, setVariantState]);

  return (
    <Grid>
      <GridItem>
        <Heading>Followable Users</Heading>
        <Text fontSize="lg">
          This route <Code>/users/following/followable</Code> is used to list
          users that I can follow.
        </Text>
      </GridItem>
      {followable &&
        followable.map((u) => (
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
            {u.id} - {u.email} - {u.name} - followers:{' '}
            {u.followers_aggregate.aggregate.count}, following:{' '}
            {u.following_aggregate.aggregate.count}
          </GridItem>
        ))}
      {!followable ||
        (followable.length === 0 && (
          <GridItem>
            <p>
              It appears that there are no other users who you can follow.
              You've either followed everyone or there is no-one else registered
              .
            </p>
            <p>
              Visit the
              <Link to={followingUrl}>Followed Users page</Link> to see the
              users you're following.
            </p>
          </GridItem>
        ))}
    </Grid>
  );
};

export default FollowingFollowableUsers;
