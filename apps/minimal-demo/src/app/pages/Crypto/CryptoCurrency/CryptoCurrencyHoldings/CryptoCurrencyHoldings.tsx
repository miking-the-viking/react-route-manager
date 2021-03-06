import {
  Box,
  Code,
  Flex,
  Heading,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react';
import { useRouteManagerContext } from '@react-route-manager/react-route-manager';
import React from 'react';
import { useParams } from 'react-router';
import { CryptoState } from '../../useCryptoList';
import { useCryptoFromCode } from '../useCryptoFromCode';

const booleanLabel = (b: boolean) => (b ? `Yup` : `Nope`);

const CryptoCurrencyHoldings: React.FC = () => {
  const { currency: code } = useParams();

  const crypto = useCryptoFromCode(code);
  const {
    state: { holdings },
  } = useRouteManagerContext<CryptoState>();

  const cryptoHoldings = holdings[crypto.details.code];

  return (
    <div>
      <Heading>
        Crypto Currency {crypto.details.name} ({code}) Holdings
      </Heading>
      <Flex flexDirection={'column'} ml={'1em'}>
        <Text>
          You have hodlings? {cryptoHoldings.amount} worth $
          {crypto.price * cryptoHoldings.amount} USD
        </Text>
      </Flex>
    </div>
  );
};

export default CryptoCurrencyHoldings;
