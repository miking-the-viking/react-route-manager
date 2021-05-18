import { RouteConfig } from './RouteConfig';

export type RouteManagerProviderProps<R extends Record<string, unknown>> = {
  state: R;
  routes: RouteConfig<R>[];
  LoadingIndicator?: () => JSX.Element;
  // setVariantState: (key: string, value: any) => void;
  RouterWrapper?: React.FC;
};
