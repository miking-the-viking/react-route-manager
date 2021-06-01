import { useRouteManagerContext } from '@react-route-manager/react-route-manager';
import React from 'react';
import { Link } from 'react-router-dom';
import { WELCOME } from '../Welcome/Welcome.route';

export default () => {
  const { allowedRouteBySymbol } = useRouteManagerContext();
  return (
    <p>
      The barest minimal React Route Manager Setup{' '}
      <Link to={allowedRouteBySymbol(WELCOME).absolutePath}>
        Return To Welcome Page
      </Link>
    </p>
  );
};
