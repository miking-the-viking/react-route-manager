import { RRM } from '@react-route-manager/react-route-manager';
import { RequiresHoldingsInCryptoRedirectRule } from '../../../../router/rules/RequiresHoldingsInCrypto/RequiresHoldingsInCrypto';
import { CRYPTO_CURRENCY_HOLDINGS } from './CryptoCurrencyHoldings.symbol';

export const CryptoCurrencyHoldingsRoute = RRM.Route({
  path: 'hodlings',
  key: CRYPTO_CURRENCY_HOLDINGS,
  importComponent: () => import('./CryptoCurrencyHoldings'),
  name: 'Holdings',
  description: 'Holdings for crypto',
  collections: ['nav'],
  rules: [RequiresHoldingsInCryptoRedirectRule],
});
