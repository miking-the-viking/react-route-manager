import {
  Button,
  Code,
  Flex,
  Heading,
  Link as L,
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
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import { CRYPTO_CURRENCY } from '../CryptoCurrency/CryptoCurrency.symbol';
import { CRYPTO_CURRENCY_HOLDINGS } from '../CryptoCurrency/CryptoCurrencyHoldings/CryptoCurrencyHoldings.symbol';
import { CryptoState, useCryptoList } from '../useCryptoList';

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

  const currencyRoute = allowedRouteBySymbol(CRYPTO_CURRENCY, {
    currency: holdingKey,
  });

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
        {holdingKey && allowedHoldingsRoute && (
          <L as={Link} to={allowedHoldingsRoute.absolutePath}>
            Go to your holdings of {holdingKey}
          </L>
        )}
        {currencyRoute && (
          <L as={Link} to={currencyRoute?.absolutePath}>
            Go to the currency page of {holdingKey}
          </L>
        )}
        <L as={Link} to={'/crypto/BTC/hodlings'}>
          Try to go to BTC holdings
        </L>

        <Outlet />
      </Flex>
    </div>
  );
};

export default CryptoIndex;
