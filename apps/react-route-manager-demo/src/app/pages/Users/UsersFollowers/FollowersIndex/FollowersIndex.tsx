import { Code, Grid, GridItem, Heading, Text } from '@chakra-ui/react';
import { UserCompleteFragment } from '@react-route-manager/hooks-api';
import { useRouteManagerContext } from '@react-route-manager/react-route-manager';
import React from 'react';
import { Link } from 'react-router-dom';
import { FollowState } from '../../../../router/hooks/useFollowState';
import { FOLLOWERS_PROFILE } from '../FollowersProfile/FollowersProfile.route';

const FollowersIndex: React.FC = () => {
  const {
    allowedRouteBySymbol,
    state: { followers },
  } = useRouteManagerContext<FollowState>();

  return (
    <Grid>
      <GridItem>
        <Heading>Users Index</Heading>
        <Text fontSize="lg">
          This route <Code>/users/following/</Code> is the main Index route for
          the UsersFollowing route. <Code>/users</Code>.
        </Text>
      </GridItem>

      {followers &&
        followers
          .map((u) => {
            const route = allowedRouteBySymbol(FOLLOWERS_PROFILE, {
              id: u.id,
            });

            if (!route) {
              return undefined;
            }

            return FollowersGridItem(u, route.absolutePath);
          })
          .filter((u) => u != null)}
      {!(followers?.length !== 0) && NoFollowers}
    </Grid>
  );
};

const FollowersGridItem = (followableUser: UserCompleteFragment, path) => {
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
      <Link to={`${path}`}>
        {id} - {email} - {name} - followers: {followers_count}, following:{' '}
        {following_count}
      </Link>
    </GridItem>
  );
};

const NoFollowers = () => <p>It appears as though no one is following you!</p>;

export default FollowersIndex;
