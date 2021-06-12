import {
  Button,
  Code,
  Flex,
  Heading,
  List,
  ListItem,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Outlet } from 'react-router';
import { useRouteManagerContext } from '../../../../../../../libs/react-route-manager/src';
import { CryptoState, useCryptoList } from '../useCryptoList';

const CryptoIndex: React.FC = () => {
  useCryptoList();

  const {
    state: { cryptos = {}, holdings = {} },
    setVariantState,
  } = useRouteManagerContext<CryptoState>();

  const holdingKeys = Object.keys(holdings);
  console.log(holdingKeys);

  const [holdingKey, setHoldingKey] = useState<string | null>(null);
  const [holdingQuantity, setHoldingQuantity] = useState<number | null>(null);

  return (
    <div>
      <Heading>Crypto Index Page</Heading>
      <Text>
        There are {Object.keys(cryptos ?? {}).length ?? 0} cryptocurrencies
        loaded. They've been used as dynamic state for variants of the dynamic
        route <Code>currency/:crypto</Code>.
      </Text>
      <Flex flexDirection="column">
        {holdingKeys.length > 0 ? (
          <>
            <Text>You have holdings in:</Text>
            <UnorderedList>
              {holdingKeys.map((key) => {
                return (
                  <ListItem>
                    {key}: {holdings[key].amount}
                  </ListItem>
                );
              })}
            </UnorderedList>
          </>
        ) : (
          <Text>You hold no crypto.</Text>
        )}

        <Select
          placeholder="Select Crypto Code"
          onChange={(event) => {
            setHoldingKey(event.currentTarget.value);
          }}
        >
          {Object.keys(cryptos).map((cryptoKey) => {
            return <option value={cryptoKey}>{cryptoKey}</option>;
          })}
        </Select>
        <NumberInput
          min={0}
          precision={10}
          onChange={(asS, asN) => {
            setHoldingQuantity(asN);
          }}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Button
          onClick={() => {
            setVariantState('holdings', {
              ...holdings,
              [holdingKey]: {
                amount: holdingQuantity,
              },
            });
            setHoldingQuantity(null);
            setHoldingKey(null);
          }}
        >
          Click to save holdings
        </Button>
        <Outlet />
      </Flex>
    </div>
  );
};

export default CryptoIndex;
