import { faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { RRM } from '@react-route-manager/react-route-manager';
import { CRYPTO_CURRENCY } from './CryptoCurrency.symbol';
import { CryptoCurrencyHoldingsRoute } from './CryptoCurrencyHoldings/CryptoCurrencyHoldings.route';
import { CryptoCurrencyScroogeRoute } from './CryptoCurrencyScrooge/CryptoCurrencyScrooge.route';

export const CryptoCurrencyDynamicRoute = RRM.DynamicRoute({
  path: ':currency',
  key: CRYPTO_CURRENCY,
  importComponent: () => import('./CryptoCurrency'),
  name: 'Crypto Currency',
  description: 'Crypto Currency Viewer',
  collections: ['nav'],
  icon: faMoneyBill,
  children: [CryptoCurrencyHoldingsRoute, CryptoCurrencyScroogeRoute],
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
