import { Code, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router';
import { useCryptoList } from '../useCryptoList';

const CryptoIndex: React.FC = () => {
  const { cryptos } = useCryptoList();

  return (
    <div>
      <Heading>Crypto Index Page</Heading>
      <Text>
        There are {Object.keys(cryptos ?? {}).length ?? 0} cryptocurrencies
        loaded. They've been used as dynamic state for variants of the dynamic
        route <Code>currency/:crypto</Code>.
      </Text>

      <Outlet />
    </div>
  );
};

export default CryptoIndex;
