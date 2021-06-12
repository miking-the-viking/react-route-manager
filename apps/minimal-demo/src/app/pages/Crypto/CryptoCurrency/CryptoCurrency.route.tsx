import { faBlind } from '@fortawesome/free-solid-svg-icons';
import { Route } from '@react-route-manager/react-route-manager';
import { generatePath } from 'react-router';
import { CryptoListItem } from '../useCryptoList';
import { CRYPTO_CURRENCY } from './CryptoCurrency.symbol';

const CURRENCY_PATH = '/:currency';

export const cryptoCurrencyRouteGenerator = ({
  path,
  variants = undefined,
  name = 'Crypto Currency',
  description = 'Crypto Currency',
  absolutePath = undefined,
}) =>
  new Route({
    key: CRYPTO_CURRENCY,
    path,
    importComponent: () => import('./CryptoCurrency'),
    name,
    description,
    icon: faBlind,
    collections: ['nav'],
  });

const currencyRoute = (currency: CryptoListItem) => {
  const { code, is_crypto, name } = currency;

  const path = generatePath(CURRENCY_PATH, { currency: code });
  return cryptoCurrencyRouteGenerator({
    absolutePath: path,
    path,
    name,
    description: name,
  });
};

export const CRYPTO_CURRENCY_ROUTE_REAL = cryptoCurrencyRouteGenerator({
  path: CURRENCY_PATH,
  variants: ({ currencies = [] }: CryptoState) => {
    return currencies.map(currencyRoute);
  },
});
