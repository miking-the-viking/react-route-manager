import { useAuth0 } from '@auth0/auth0-react';
import { Code, Grid, GridItem, Heading, Text } from '@chakra-ui/react';
import React from 'react';

const UsersProfile: React.FC = () => {
  const { user, isLoading } = useAuth0();

  if (isLoading) return <p>Loading...</p>;

  return (
    <Grid>
      <GridItem>
        <Heading>My Profile Profile</Heading>
        <Text fontSize="lg">
          This route <Code>/users/profile</Code> is my (
          <em>currently authenticated user's</em>) Profile.
        </Text>
      </GridItem>
      <GridItem>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </GridItem>
    </Grid>
  );
};

export default UsersProfile;
