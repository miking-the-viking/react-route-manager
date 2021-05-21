export type RouteManagerProviderProps<R extends Record<string, unknown>> = {
  state: R;
  LoadingIndicator?: () => JSX.Element;
  RouterWrapper?: React.FC;
};
