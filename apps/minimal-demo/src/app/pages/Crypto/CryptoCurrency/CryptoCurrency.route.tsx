import {
  Route,
  RouteRule,
  RouteRuleEvaluator,
} from '@react-route-manager/react-route-manager';
import { CRYPTO } from '../Crypto.symbol';
import { CRYPTO_INDEX } from '../CryptoIndex/CryptoIndex.symbol';
import { CryptoState } from '../useCryptoList';
import { CRYPTO_CURRENCY } from './CryptoCurrency.symbol';

const CURRENCY_PATH = ':currency';

//
// Rules
const RequiresCryptos: RouteRuleEvaluator<CryptoState> = ({ cryptos }) => {
  return !!cryptos && Object.keys(cryptos).length > 0;
};

export const REQUIRES_CRYPTOS_REDIRECT: RouteRule<CryptoState> = [
  [RequiresCryptos],
  CRYPTO,
];

const RequiresRealCryptoCurrency = (
  code: string
): RouteRuleEvaluator<CryptoState> => ({ cryptos }) => {
  return !!cryptos && !!cryptos[code];
};

export const REQUIRES_REAL_CRYPTO_CURRENCY = (
  code: string
): RouteRule<CryptoState> => [[RequiresRealCryptoCurrency(code)], CRYPTO_INDEX];

export const CryptoCurrencyDynamicRoute = new Route<CryptoState>({
  path: CURRENCY_PATH,
  key: CRYPTO_CURRENCY,
  importComponent: () => import('./CryptoCurrency'),
  name: 'Crypto Currency',
  description: 'Crypto Currency Viewer',
  collections: ['nav'],
  dynamicRoutes: ({ cryptos = {} }) => {
    return Object.keys(cryptos).map((key) => {
      const {
        code,
        name,
        has_enabled_pairs,
        is_base_of_enabled_pair,
        is_quote_of_enabled_pair,
      } = cryptos[key].details;

      return {
        name: `${name}${
          has_enabled_pairs &&
          (is_base_of_enabled_pair || is_quote_of_enabled_pair)
            ? ' *'
            : ''
        }`,
        rules: [
          // TODO: this rule is superfluous and doesn't work.
          // REQUIRES_REAL_CRYPTO_CURRENCY(code),
        ],
        params: {
          // TODO: see if can be typed better
          // potentially with template literal type?
          currency: code,
        },
      };
    });
  },
});
