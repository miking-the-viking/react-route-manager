import React from 'react';
import { Button, Heading, Link as L, Text } from '@chakra-ui/react';
import { faAward, faMedal, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouteManagerContext } from '@react-route-manager/react-route-manager';
import { Link, Outlet } from 'react-router-dom';
import { ClicksState } from '../../../router/rules/shared/ClicksState';
import { CLICKS_TROPHY_TIER_INTERVAL } from '../clicks.const';
import { GOD_TIER } from './GodTier/GodTier.symbol';
import { useMemo } from 'react';

function useTrophyState() {
  const {
    state: { clicks = 0 },
    allowedRouteBySymbol,
  } = useRouteManagerContext<ClicksState>();
  const godTierRoute = allowedRouteBySymbol(GOD_TIER);

  const [TrophyIcon, encouragementMessage] = useMemo(() => {
    const nextTierCount = clicks % CLICKS_TROPHY_TIER_INTERVAL;
    const nextTierMessage =
      nextTierCount > 0
        ? ` Only ${
            CLICKS_TROPHY_TIER_INTERVAL - nextTierCount
          } clicks until you've got it!`
        : ``;

    switch (Math.floor(clicks / CLICKS_TROPHY_TIER_INTERVAL)) {
      case 0:
      case 1:
        return [
          <FontAwesomeIcon icon={faAward} />,
          'Do more clicks to get a medal!' + nextTierMessage,
        ];
      case 2:
        return [
          <FontAwesomeIcon icon={faMedal} />,
          "Keep going! You've almost gotten the TROPHY!!" + nextTierMessage,
        ];
      default:
        return [
          <FontAwesomeIcon icon={faTrophy} />,
          "Great job! Now's time time for bragging rights",
        ];
    }
  }, [clicks]);

  const GodTierLink = godTierRoute && (
    <L as={Link} to={godTierRoute.absolutePath}>
      Godlike.
    </L>
  );

  return {
    TrophyIcon,
    encouragementMessage,
    GodTierLink,
  };
}

const Trophy: React.FC = () => {
  const { TrophyIcon, encouragementMessage, GodTierLink } = useTrophyState();
  const { setVariantState } = useRouteManagerContext<ClicksState>();

  return (
    <div>
      <Heading>
        {TrophyIcon} Trophy {TrophyIcon}
      </Heading>
      <Text>
        Wow! You've unlocked the trophy for having clicked the button sufficient
        times!
      </Text>
      <Text>{encouragementMessage}</Text>
      <Button
        onClick={() => {
          setVariantState('clicks', 0);
        }}
      >
        Reset clicks and lets do that again!
      </Button>

      {GodTierLink}
      <Outlet />
    </div>
  );
};

export default Trophy;
