import React from 'react';
import { useRouterState } from '../../router/useRouterState';

const GuestAbout = () => {
  return <p>Guest About</p>;
};

const AuthenticatedAbout = () => {
  return <p>Authenticated About</p>;
};

export default () => {
  const { authenticated } = useRouterState();

  return authenticated ? <AuthenticatedAbout /> : <GuestAbout />;
};
