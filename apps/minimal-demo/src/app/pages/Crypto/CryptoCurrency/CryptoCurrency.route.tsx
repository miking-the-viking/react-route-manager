import { faBlind } from '@fortawesome/free-solid-svg-icons';
import {
  Route,
  RouteRule,
  RouteRuleEvaluator,
} from '@react-route-manager/react-route-manager';
import { generatePath } from 'react-router';
import { CRYPTO } from '../Crypto.symbol';
import { CryptoListItem, CryptoState } from '../useCryptoList';
import { CRYPTO_CURRENCY } from './CryptoCurrency.symbol';

const CURRENCY_PATH = 'currency/:currency';

const RequiresCryptos: RouteRuleEvaluator<CryptoState> = ({ cryptos }) => {
  return !!cryptos && cryptos.length > 0;
};

export const REQUIRES_CRYPTOS_REDIRECT: RouteRule<CryptoState> = [
  [RequiresCryptos],
  CRYPTO,
];

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
    rules: [REQUIRES_CRYPTOS_REDIRECT],
    variants,
    absolutePath,
  });

const currencyRoute = (currency: CryptoListItem) => {
  const { code, is_crypto, name } = currency;

  const path = generatePath(CURRENCY_PATH, { currency: code });
  console.log(`generated path for currency route = ${path}`);
  return cryptoCurrencyRouteGenerator({
    absolutePath: path,
    path,
    name,
    description: name,
  });
};

export const CRYPTO_CURRENCY_ROUTE = cryptoCurrencyRouteGenerator({
  path: CURRENCY_PATH,
  variants: ({ cryptos = [] }: CryptoState) => {
    return cryptos.map(currencyRoute);
  },
});
