import { Code, Divider, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router';
import { UsersContextualWrapper } from './UsersContext';

const Users: React.FC = () => {
  return (
    <>
      <Heading>Users</Heading>
      <Text fontSize="lg">
        This route <Code>/users</Code> is responsible for User-related pages.
        User Profile, and Following/Followers
      </Text>
      <Divider />
      <Outlet />
    </>
  );
};

export default () => (
  <UsersContextualWrapper>
    <Users />
  </UsersContextualWrapper>
);
