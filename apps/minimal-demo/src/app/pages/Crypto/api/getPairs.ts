// https://api.n.exchange/en/api/v1/pair/

import { getData } from './utils/getData';

const url = 'https://api.n.exchange/en/api/v1/pair/';

export type CryptoCurrencyPair = {
  name: string;
  base: string;
  quote: string;
  fee_ask: string;
  fee_bid: string;
};

export const getPairs = () => {
  return getData<CryptoCurrencyPair[]>(url);
};
