import { Box, Button, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  RouterMetaWrap,
  useRouteManagerContext,
} from '@react-route-manager/react-route-manager';
import { WELCOME_ROUTE } from './Welcome.route';
import { useAuth0 } from '@auth0/auth0-react';
import { USERS_INDEX } from '../Users/UsersIndex/UsersIndex.route';

const Welcome: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Flex justifyContent="space-between" flexDir="column" minH="100vh">
      <Box>
        <Box id="header" p="6">
          <Text fontSize="xl" fontWeight="bold">
            React Route Manager Demo App Welcome
          </Text>
        </Box>
        <Box id="content" background={'cornflowerblue'} p="0" m="0">
          <Box p="0" m="0" maxW="66%" minW="10rem">
            <Box px="6" py="6" color="white">
              <Button onClick={() => loginWithRedirect()}>Login</Button>
              <br />
              <Link to={'/users/'}>Try to access Users</Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default RouterMetaWrap(WELCOME_ROUTE, Welcome);
