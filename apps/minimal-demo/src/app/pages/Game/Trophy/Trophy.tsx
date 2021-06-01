import { Button } from '@chakra-ui/react';
import { useRouteManagerContext } from '@react-route-manager/react-route-manager';
import React from 'react';
import { ClickState } from '../../../router/rules/HasClicks/HasClicks';

const Trophy: React.FC = () => {
  const {
    setVariantState,
    state: { clicks = 0 },
  } = useRouteManagerContext<ClickState>();

  return (
    <div>
      <p>Trophy</p>
      <p>
        Wow! You've unlocked the trophy for having clicked the button {clicks}{' '}
        times!
      </p>
      <Button
        onClick={() => {
          setVariantState('clicks', 0);
        }}
      >
        Reset clicks and lets do that again!
      </Button>
    </div>
  );
};

export default Trophy;
