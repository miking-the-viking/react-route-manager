import { faBlind } from '@fortawesome/free-solid-svg-icons';
import {
  Route,
  RouteRule,
  RouteRuleEvaluator,
} from '@react-route-manager/react-route-manager';
import { generatePath } from 'react-router';
import { CryptoCurrencyListItem } from '../api/getCurrencies';
import { CRYPTO } from '../Crypto.symbol';
import { CryptoCurrencyData, CryptoState } from '../useCryptoList';
import { CRYPTO_CURRENCY } from './CryptoCurrency.symbol';

const CURRENCY_PATH = ':currency';

const RequiresCryptos: RouteRuleEvaluator<CryptoState> = ({ cryptos }) => {
  return !!cryptos && Object.keys(cryptos).length > 0;
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

const currencyRoute = (currency: CryptoCurrencyData) => {
  const {
    code,
    is_crypto,
    name,
    has_enabled_pairs,
    is_base_of_enabled_pair,
    is_quote_of_enabled_pair,
  } = currency.details;

  const path = generatePath(CURRENCY_PATH, { currency: code });
  return cryptoCurrencyRouteGenerator({
    absolutePath: path,
    path,
    name: `${name}${
      has_enabled_pairs && (is_base_of_enabled_pair || is_quote_of_enabled_pair)
        ? ' *'
        : ''
    }`,
    description: name,
  });
};

export const CRYPTO_CURRENCY_ROUTE = cryptoCurrencyRouteGenerator({
  path: CURRENCY_PATH,
  variants: ({ cryptos = {} }: CryptoState) => {
    return Object.keys(cryptos).map((key) => currencyRoute(cryptos[key]));
  },
});
