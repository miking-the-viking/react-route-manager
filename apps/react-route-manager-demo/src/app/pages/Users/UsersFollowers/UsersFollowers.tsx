import { Code, Divider, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router';

const UsersFollowers: React.FC = () => {
  return (
    <>
      <Heading>UsersFollowers</Heading>
      <Text fontSize="lg">
        This route <Code>/users/followers</Code> is a sub-router responsible for
        pages concerning users that are following me. User Profile, Follower
        Management.
      </Text>
      <Divider />
      <Outlet />
    </>
  );
};

export default UsersFollowers;
