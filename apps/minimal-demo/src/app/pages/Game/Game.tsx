import { Button, Divider } from '@chakra-ui/react';
import { useRouteManagerContext } from '@react-route-manager/react-route-manager';
import React from 'react';
import { Outlet } from 'react-router';
import { ClickState } from '../../router/rules/HasClicks/HasClicks';

const Game: React.FC = () => {
  const {
    setVariantState,
    state: { clicks = 0 },
  } = useRouteManagerContext<ClickState>();

  return (
    <div>
      <p>Game</p>
      <p>
        Button has been clicked {clicks} times. Unlock more routes with a
        greater clicks number.
      </p>
      <Button
        onClick={() => {
          setVariantState('clicks', clicks + 1);
        }}
      >
        Add Click
      </Button>
      <Divider />
      <Outlet />
    </div>
  );
};

export default Game;
