import { RRM } from '@react-route-manager/react-route-manager';
import { CRYPTO_CURRENCY } from './CryptoCurrency.symbol';

export const CryptoCurrencyDynamicRoute = RRM.DynamicRoute({
  path: ':currency',
  key: CRYPTO_CURRENCY,
  importComponent: () => import('./CryptoCurrency'),
  name: 'Crypto Currency',
  description: 'Crypto Currency Viewer',
  collections: ['nav'],
  dynamicRoutes: ({ cryptos = {} }) => {
    return Object.keys(cryptos).map((key) => {
      const { code, name } = cryptos[key].details;

      return {
        name,
        // rules: [
        // TODO: this rule is superfluous and doesn't work.
        // REQUIRES_REAL_CRYPTO_CURRENCY(code),
        // ],
        // TODO: Make the children of variants work
        // children: [CryptoCurrencyHoldingsRoute],
        params: {
          currency: code,
        },
      };
    });
  },
});
