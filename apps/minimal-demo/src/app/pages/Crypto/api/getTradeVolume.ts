import { getData } from './utils/getData';

const url = (hours?: number) =>
  `https://api.n.exchange/en/api/v1/volume/${hours ? `?hours=${hours}` : ''}`;

export type CryptoCurrencyVolume = {
  hours: number;
  total_volume: {
    base_volume_btc: number;
    quote_volume_btc: number;
  };
  tradable_pairs: {
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
  }[];
};

export const getTradeVolume = (hours?: number) =>
  getData<CryptoCurrencyVolume>(url(hours));
