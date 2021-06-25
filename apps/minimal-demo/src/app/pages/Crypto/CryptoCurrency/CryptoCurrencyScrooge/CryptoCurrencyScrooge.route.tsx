import { RRM } from '@react-route-manager/react-route-manager';
import { RequiresMinimalUSDHoldingsRedirectRule } from '../../../../router/rules/RequiresMinimalUSDHoldings/RequiresMinimalUSDHoldings';
import { CRYPTO_CURRENCY_SCROOGE } from './CryptoCurrencyScrooge.symbol';

export const CryptoCurrencyScroogeRoute = RRM.Route({
  path: 'scrooge',
  key: CRYPTO_CURRENCY_SCROOGE,
  importComponent: () => import('./CryptoCurrencyScrooge'),
  name: 'Scrooge McDuck',
  description: 'You have mad gains here',
  collections: ['nav'],
  rules: [RequiresMinimalUSDHoldingsRedirectRule(10000)],
});
