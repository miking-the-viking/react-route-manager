import { Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router';
import { useCryptoList } from '../useCryptoList';

const CryptoIndex: React.FC = () => {
  const { cryptos } = useCryptoList();

  return (
    <div>
      <Heading>Crypto Index Page</Heading>
      <Text>
        There are {cryptos?.length ?? 0} cryptocurrencies loaded. Check the
        sidebar to see them.
      </Text>

      <Outlet />
    </div>
  );
};

export default CryptoIndex;
