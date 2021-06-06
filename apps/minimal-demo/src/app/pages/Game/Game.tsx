import { Button, Divider, Heading, Text } from '@chakra-ui/react';
import { useRouteManagerContext } from '@react-route-manager/react-route-manager';
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { ClicksState } from '../../router/rules/shared/ClicksState';
import { GOD_TIER } from './Trophy/GodTier/GodTier.symbol';
import { TROPHY } from './Trophy/Trophy.symbol';

const Game: React.FC = () => {
  const navigate = useNavigate();
  const {
    setVariantState,
    state: { clicks = 0 },
  } = useRouteManagerContext<ClicksState>();

  const {
    allowedRouteBySymbol,
    activeRoute,
    allowedRoutes,
  } = useRouteManagerContext();

  // TODO: Consider if this redirect behavior were a rule and automatic. Game2
  // TODO: Convenience method to know if activeSubrouteOf(RouteSymbol)
  useEffect(() => {
    const [trophyRoute, godRoute] = [
      allowedRouteBySymbol(TROPHY),
      allowedRouteBySymbol(GOD_TIER),
    ];
    // this redirect should only occur if the trophy is unlocked. The base route shouldn't be displayed alone.
    // Feels very manual and the check for 1...N child routes is gross.
    if (
      trophyRoute &&
      activeRoute !== trophyRoute &&
      activeRoute !== godRoute
    ) {
      navigate(trophyRoute.absolutePath);
    }
  }, [navigate, allowedRouteBySymbol, clicks, activeRoute, allowedRoutes]);

  return (
    <div>
      <Heading>Game</Heading>
      <Text>
        This version of the game is designed as a route with a child that is
        rule-restricted until a certain number of clicks has.
      </Text>
      <Text>
        You can try to access the trophy route programmatically. The ACL
        restrictions of the route will ensure that you are properly redirected
        before accessing the page.
      </Text>
      <Text>
        Button has been clicked {clicks} times. Unlock more routes with a
        greater clicks number.
      </Text>
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
