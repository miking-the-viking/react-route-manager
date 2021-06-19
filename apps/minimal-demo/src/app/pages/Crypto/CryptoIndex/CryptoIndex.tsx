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
import { useRouteManagerContext } from '@react-route-manager/react-route-manager';
import React, { useState } from 'react';
import { generatePath, Outlet } from 'react-router';
import { CryptoState, useCryptoList } from '../useCryptoList';
import { Link } from 'react-router-dom';
import { Link as L } from '@chakra-ui/react';
import { CRYPTO_CURRENCY_HOLDINGS } from '../CryptoCurrency/CryptoCurrencyHoldings/CryptoCurrencyHoldings.symbol';

const CryptoIndex: React.FC = () => {
  useCryptoList();

  const {
    state: { cryptos = {}, holdings = {} },
    setVariantState,
    allowedRouteBySymbol,
  } = useRouteManagerContext<CryptoState>();

  const holdingKeys = Object.keys(holdings);

  const [holdingKey, setHoldingKey] = useState<string | null>(null);
  const [holdingQuantity, setHoldingQuantity] = useState<number | null>(null);

  const allowedHoldingsRoute = allowedRouteBySymbol(CRYPTO_CURRENCY_HOLDINGS, {
    currency: holdingKey,
  });

  const holdingsPath = allowedHoldingsRoute?.absolutePath;

  const withParams =
    holdingKey && holdingsPath
      ? generatePath(holdingsPath, {
          currency: holdingKey,
        })
      : '';

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
                  <ListItem key={key}>
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
            return (
              <option key={cryptoKey} value={cryptoKey}>
                {cryptoKey}
              </option>
            );
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
        {holdingsPath && (
          <L as={Link} to={holdingsPath}>
            Go to your holdings of {holdingKey}
          </L>
        )}
        {holdingsPath && (
          <L as={Link} to={withParams}>
            Go to your holdings of {holdingKey}
          </L>
        )}
        <Outlet />
      </Flex>
    </div>
  );
};

export default CryptoIndex;
