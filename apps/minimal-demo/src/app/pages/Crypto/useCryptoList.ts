import axios from 'axios';
import { useEffect, useState } from 'react';

//https://nexchange2.docs.apiary.io/#reference/0/ticker-summarized-volume/get-ticker

export interface CryptoListItem {
  code: string;
  name: string;
  min_confirmations: number;
  is_crypto: boolean;
  minimal_amount: string;
  is_base_of_enabled_pair: boolean;
  is_quote_of_enabled_pair: boolean;
  has_enabled_pairs: boolean;
}

export type CryptoState = {
  cryptos: CryptoListItem[];
};

export function useCryptoList() {
  const [loading, setLoading] = useState<boolean>(false);

  const [data, setData] = useState<CryptoListItem[]>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await axios.get(
        'https://api.n.exchange/en/api/v1/currency/'
      );
      setData(response.data);
      setLoading(false);
    })();
  }, []);

  return { data, loading };
}
