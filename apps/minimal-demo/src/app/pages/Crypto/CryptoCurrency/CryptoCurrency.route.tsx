import { Route } from '@react-route-manager/react-route-manager';
import { CryptoState } from '../useCryptoList';
import { CRYPTO_CURRENCY } from './CryptoCurrency.symbol';
import { CryptoCurrencyHoldingsRoute } from './CryptoCurrencyHoldings/CryptoCurrencyHoldings.route';

const CURRENCY_PATH = ':currency';

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
        // TODO: Make the children of variants work
        // children: [CryptoCurrencyHoldingsRoute],
        params: {
          // TODO: see if can be typed better
          // potentially with template literal type?
          currency: code,
        },
      };
    });
  },
});
