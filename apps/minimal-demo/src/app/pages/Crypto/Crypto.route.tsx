import { faBlind } from '@fortawesome/free-solid-svg-icons';
import { Route } from '@react-route-manager/react-route-manager';
import { CRYPTO } from './Crypto.symbol';
import { CryptoCurrencyDynamicRoute } from './CryptoCurrency/CryptoCurrency.route';
import { CRYPTO_INDEX_ROUTE } from './CryptoIndex/CryptoIndex.route';

export const CRYPTO_ROUTE = new Route({
  key: CRYPTO,
  path: 'crypto',
  importComponent: () => import('./Crypto'),
  name: 'Crypto',
  description: 'Cryptocurrency Viewer',
  icon: faBlind,
  collections: ['nav'],
  children: [CRYPTO_INDEX_ROUTE, CryptoCurrencyDynamicRoute],
});
