import { Box, Divider, Flex, Link as L, Text } from '@chakra-ui/react';
import { useRouteManagerContext } from '@react-route-manager/react-route-manager';
import React from 'react';
import { Link } from 'react-router-dom';
import { ClicksState } from '../../router/rules/shared/ClicksState';
import { ABOUT } from '../About/About.symbol';
import { CRYPTO } from '../Crypto/Crypto.symbol';
import { TROPHY } from '../Game/Trophy/Trophy.symbol';

const Welcome: React.FC = () => {
  const { allowedRouteBySymbol } = useRouteManagerContext<ClicksState>();

  // const cryptoUrl = allowedRouteBySymbol(CRYPTO);
  return (
    <Flex justifyContent="space-between" flexDir="column" minH="100vh">
      <Box>
        <Box id="header" p="6">
          <Text fontSize="xl" fontWeight="bold">
            React Route Manager Minimal Demo App Welcome
          </Text>
        </Box>
        <Box id="content" background={'cornflowerblue'} p="0" m="0">
          <Box p="0" m="0" minW="10rem" px="6" py="6" color="white">
            <Divider mt={10} mb={10} />
            {/* <Text>
              <L as={Link} to={cryptoUrl.absolutePath}>
                CLICK HERE
              </L>{' '}
              to navigate to the Crypto Dashboard. This will load
              cryptocurrencies from a public API and dynamically create new
              routes.
            </Text>
            <Divider mt={10} mb={10} /> */}
            <Text mb={3}>
              To demonstrate the implicit ACL nature of the route
              configurations:
            </Text>
            <Text>
              <L as={Link} to={'/game/trophy'}>
                CLICK HERE
              </L>{' '}
              to try to go to the /trophy restricted child route of /game. The
              redirect will ensure that you're taken to /game unless you have
              the prerequisite clicks.
            </Text>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default Welcome;
