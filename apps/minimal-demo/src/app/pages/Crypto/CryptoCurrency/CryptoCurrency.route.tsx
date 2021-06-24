import { RRM } from '@react-route-manager/react-route-manager';
import { CRYPTO_CURRENCY } from './CryptoCurrency.symbol';
import { CryptoCurrencyHoldingsRoute } from './CryptoCurrencyHoldings/CryptoCurrencyHoldings.route';

export const CryptoCurrencyDynamicRoute = RRM.DynamicRoute({
  path: ':currency',
  key: CRYPTO_CURRENCY,
  importComponent: () => import('./CryptoCurrency'),
  name: 'Crypto Currency',
  description: 'Crypto Currency Viewer',
  collections: ['nav'],
  children: [CryptoCurrencyHoldingsRoute as any], // TODO: when this is not `any` the `dynamicRoutes` throws a type error :/
  dynamicRoutes: ({ cryptos = {} }) => {
    return Object.keys(cryptos).map((key) => {
      const { code, name } = cryptos[key].details;
      return {
        name,
        params: {
          currency: code,
        },
      };
    });
  },
});
