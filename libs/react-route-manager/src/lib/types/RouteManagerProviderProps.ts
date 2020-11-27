import { RouteConfig } from "./RouteConfig";

export type RouteManagerProviderProps<R extends Record<string, unknown>> = {
  state: R;
  routes: RouteConfig<R>[];
  LoadingIndicator?: () => JSX.Element;
  Wrapper?: React.FC;
};
