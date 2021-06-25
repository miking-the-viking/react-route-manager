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
import scrooge from '../../../../../assets/scrooge.gif';

const CryptoCurrencyHoldings: React.FC = () => {
  const { currency: code } = useParams();

  const crypto = useCryptoFromCode(code);
  const {
    state: { holdings, cryptos },
  } = useRouteManagerContext<CryptoState>();

  const cryptoHoldings = holdings[crypto.details.code];

  return (
    <div>
      <Heading>
        You have mad holdings in {crypto.details.name} ({code}) worth: $
        {holdings[code].amount * crypto.price} USD
      </Heading>
      <Flex flexDirection={'column'} ml={'1em'}>
        <img src={scrooge} width={'100%'} />
      </Flex>
    </div>
  );
};

export default CryptoCurrencyHoldings;
