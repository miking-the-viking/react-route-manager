import { Box, Flex, Text } from '@chakra-ui/react';
import { useRouteManagerContext } from '@react-route-manager/react-route-manager';
import React from 'react';
import { Link } from 'react-router-dom';
import { ABOUT } from '../About/About.route';

const Welcome: React.FC = () => {
  const { allowedRouteBySymbol } = useRouteManagerContext();

  const aboutUrl = allowedRouteBySymbol(ABOUT);

  return (
    <Flex justifyContent="space-between" flexDir="column" minH="100vh">
      <Box>
        <Box id="header" p="6">
          <Text fontSize="xl" fontWeight="bold">
            React Route Manager Minimal Demo App Welcome
          </Text>
        </Box>
        <Box id="content" background={'cornflowerblue'} p="0" m="0">
          <Box p="0" m="0" maxW="66%" minW="10rem">
            <Box px="6" py="6" color="white">
              <Link to={aboutUrl.absolutePath}>To About</Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default Welcome;
