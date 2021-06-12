import { getData } from './utils/getData';

const url = 'https://api.n.exchange/en/api/v1/currency/';

export type CryptoCurrencyListItem = {
  code: string;
  name: string;
  min_confirmations: number;
  is_crypto: boolean;
  minimal_amount: string;
  is_base_of_enabled_pair: boolean;
  is_quote_of_enabled_pair: boolean;
  has_enabled_pairs: boolean;
};

/**
 * Loads all supported currencies
 *
 * @returns
 */
export const getCurrencies = () => {
  return getData<CryptoCurrencyListItem[]>(url);
};
