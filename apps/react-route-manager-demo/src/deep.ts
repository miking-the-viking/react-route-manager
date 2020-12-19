type AROUTECONFIG = <R extends { route: T }[], T extends string>(
  routes: R
) => { config: any; useRoute: (routes: R[number]["route"]) => void };
const createRoute: AROUTECONFIG = () => ({ config: [], useRoute: () => null });
const routeConfig = createRoute([{ route: "routeA" }, { route: "routeB" }]);

export default routeConfig;

// routeConfig.useRoute("");
