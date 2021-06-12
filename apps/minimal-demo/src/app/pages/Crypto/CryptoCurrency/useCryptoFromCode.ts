import { useRouteManagerContext } from '../../../../../../../libs/react-route-manager/src';
import { CryptoState } from '../useCryptoList';

export function useCryptoFromCode(code: string) {
  const {
    state: { cryptos },
  } = useRouteManagerContext<CryptoState>();

  return cryptos[code];
}
