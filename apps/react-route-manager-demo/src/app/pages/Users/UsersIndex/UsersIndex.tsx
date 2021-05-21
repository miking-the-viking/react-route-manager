import { Code, Grid, GridItem, Heading, Text } from '@chakra-ui/react';
import React from 'react';

const UsersIndex: React.FC = () => {
  return (
    <Grid>
      <GridItem>
        <Heading>Users Index</Heading>
        <Text fontSize="lg">
          This route <Code>/users/</Code> is the main Index route for Users
          <Code>/users</Code>.
        </Text>
      </GridItem>
    </Grid>
  );
};

export default UsersIndex;
