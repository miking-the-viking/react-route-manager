import { Heading, Text } from '@chakra-ui/react';
import React from 'react';

const CryptoCurrency: React.FC = () => {
  return (
    <div>
      <Heading>Crypto Currency [NAME HERE] Viewer</Heading>
      <Text>
        This is a crypto currency viewer using a Public API to demonstrate a
        dynamic route such as `crypto/:cryptocurrency`
      </Text>
    </div>
  );
};

export default CryptoCurrency;
