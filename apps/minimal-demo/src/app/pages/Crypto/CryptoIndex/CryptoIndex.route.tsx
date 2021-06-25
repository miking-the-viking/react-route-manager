import { faHome } from '@fortawesome/free-solid-svg-icons';
import { RRM } from '@react-route-manager/react-route-manager';
import { CRYPTO_INDEX } from './CryptoIndex.symbol';

export const CRYPTO_INDEX_ROUTE = RRM.Route({
  key: CRYPTO_INDEX,
  path: '',
  importComponent: () => import('./CryptoIndex'),
  name: 'Crypto Dashboard',
  description: 'Cryptocurrency Dashboard',
  icon: faHome,
  collections: ['nav'],
});
