import { faBlind } from '@fortawesome/free-solid-svg-icons';
import { Route } from '@react-route-manager/react-route-manager';
import { CRYPTO_INDEX } from './CryptoIndex.symbol';

export const CRYPTO_INDEX_ROUTE = new Route({
  key: CRYPTO_INDEX,
  path: '/',
  importComponent: () => import('./CryptoIndex'),
  name: 'Crypto Dashboard',
  description: 'Cryptocurrency Dashboard',
  icon: faBlind,
  collections: ['nav'],
});
