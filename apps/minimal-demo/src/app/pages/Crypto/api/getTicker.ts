import { getData } from './utils/getData';

const url = (hours?: number) =>
  `https://api.n.exchange/en/api/v1/ticker/${hours ? `?hours=${hours}` : ''}`;

type CryptoCurrencyTicker = {
  base_volume: number;
  quote_volume: number;
  base_volume_btc: number;
  quote_volume_btc: number;
  last_ask: number;
  pair: {
    name: string;
    base: {
      code: string;
      name: string;
    };
    quote: {
      code: string;
      name: string;
    };
    fee_ask: string;
    fee_bid: string;
  };
};

export const getTicker = (hours?: number) =>
  getData<CryptoCurrencyTicker[]>(url(hours));
