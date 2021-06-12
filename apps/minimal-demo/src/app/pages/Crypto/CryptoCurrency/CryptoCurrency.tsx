import {
  Box,
  Code,
  Container,
  Flex,
  Heading,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router';
import { useCryptoFromCode } from './useCryptoFromCode';

const booleanLabel = (b: boolean) => (b ? `Yup` : `Nope`);

const CryptoCurrency: React.FC = () => {
  const { currency: code } = useParams();

  const crypto = useCryptoFromCode(code);
  return (
    <div>
      <Heading>
        Crypto Currency {crypto.details.name} ({code}) Viewer
      </Heading>
      <Flex flexDirection={'column'} ml={'1em'}>
        <Text>
          This is a crypto currency viewer using a Public API to demonstrate a
          dynamic route such as <Code>crypto/{code}</Code>
        </Text>
        <Text>Is Crypto? {booleanLabel(crypto.details.is_crypto)}</Text>
        <Text>
          Has Base Enabled Pairs?{' '}
          {booleanLabel(crypto.details.has_enabled_pairs)}
        </Text>
        <Text>
          Is Base of Enabled Pair?{' '}
          {booleanLabel(crypto.details.is_base_of_enabled_pair)}
        </Text>
        <Text>
          Is Quote of Enabled Pair?{' '}
          {booleanLabel(crypto.details.is_quote_of_enabled_pair)}
        </Text>
        <Text>Min Confirmations? {crypto.details.min_confirmations}</Text>
        <Text>Minimal Amount? {crypto.details.minimal_amount}</Text>
        {crypto.pairs.length > 0 ? (
          <Box>
            <Heading variant="h4">Pairs</Heading>
            <List>
              {crypto.pairs.map((pair) => (
                <ListItem key={pair.name}>
                  <Text>{pair.quote}</Text>
                </ListItem>
              ))}
            </List>
          </Box>
        ) : (
          <Heading variant="h4">No pairs</Heading>
        )}
      </Flex>
    </div>
  );
};

export default CryptoCurrency;
