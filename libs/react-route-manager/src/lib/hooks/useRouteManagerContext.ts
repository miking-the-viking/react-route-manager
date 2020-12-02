import { useContext } from "react";
import { RouteManagerContext } from "../RouteManagerContext";

/**
 *
 * Convenience hook for `useContext(RouteManagerContext)`
 *
 */
export const useRouteManagerContext = () => useContext(RouteManagerContext);
