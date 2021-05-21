/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react';
import { RouteManagerContext } from '../RouteManagerContext';
import { RouteManagerState } from '../types';

/**
 *
 * Convenience hook for `useContext(RouteManagerContext)`
 *
 */
export const useRouteManagerContext = <State extends Record<string, any>>() =>
  useContext(RouteManagerContext) as RouteManagerState<State>;
