import { useRouteManagerContext } from '@react-route-manager/react-route-manager';
import React from 'react';
import { Link } from 'react-router-dom';
import { Text, Link as L } from '@chakra-ui/react';
import { WELCOME } from '../Welcome/Welcome.symbol';

export default () => {
  const { allowedRouteBySymbol } = useRouteManagerContext();
  return (
    <>
      <Text>The barest minimal React Route Manager Setup</Text>
      <Text>
        <L as={Link} to={allowedRouteBySymbol(WELCOME).absolutePath}>
          Return To Welcome Page
        </L>
      </Text>
    </>
  );
};
