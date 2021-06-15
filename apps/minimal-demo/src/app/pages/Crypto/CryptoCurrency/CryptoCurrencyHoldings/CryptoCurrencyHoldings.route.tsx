import { Route } from '@react-route-manager/react-route-manager';
import { CryptoState } from '../../useCryptoList';
import { CRYPTO_CURRENCY_HOLDINGS } from './CryptoCurrencyHoldings.symbol';

export const CryptoCurrencyHoldingsRoute = new Route<CryptoState>({
  path: 'hodlings',
  key: CRYPTO_CURRENCY_HOLDINGS,
  importComponent: () => import('./CryptoCurrencyHoldings'),
  name: 'Crypto Currency',
  description: 'Crypto Currency Viewer',
  collections: ['nav'],
});
