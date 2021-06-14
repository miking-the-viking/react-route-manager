import { Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router';
import { useCryptoList } from './useCryptoList';

const Crypto: React.FC = () => {
  const { loading } = useCryptoList();

  if (loading) {
    return <Text>Loading Cryptocurrency list from API...</Text>;
  }
  return (
    <div>
      <Heading>Crypto Viewer</Heading>
      <Text>
        This is a crypto currency viewer using a Public API to demonstrate a
        dynamic route such as `crypto/:cryptocurrency`
      </Text>

      <Outlet />
    </div>
  );
};

export default Crypto;
