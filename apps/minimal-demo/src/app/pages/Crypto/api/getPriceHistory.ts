import { CryptoCurrencyLatestPrice } from './getLatestPrice';
import { getData } from './utils/getData';

const optionalParams = ['hours', 'data_points', 'market_code'] as const;

const url = (pair_name: string) =>
  `https://api.n.exchange/en/api/v1/price/${pair_name}/history/`;

export const getPriceHistory = (pair_name: string) =>
  getData<CryptoCurrencyLatestPrice[]>(url(pair_name));
