import { faBlind } from '@fortawesome/free-solid-svg-icons';
import { Route } from '@react-route-manager/react-route-manager';
import { CRYPTO } from './Crypto.symbol';
import { CRYPTO_CURRENCY_ROUTE } from './CryptoCurrency/CryptoCurrency.route';

export const CRYPTO_ROUTE = new Route({
  key: CRYPTO,
  path: 'crypto',
  importComponent: () => import('./Crypto'),
  name: 'Crypto',
  description: 'Cryptocurrency Viewer',
  icon: faBlind,
  collections: ['nav'],
  children: [CRYPTO_CURRENCY_ROUTE],
});
