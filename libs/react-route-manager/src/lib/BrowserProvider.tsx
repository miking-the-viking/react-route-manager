import React from "react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

/**
 * ReactRouteManagerBrowserProvider is a wrapper for setting up the `BrowserRouter` as well as a `HelmetProvider` for dynamically updating the page title on the fly
 */
export const ReactRouteManagerBrowserProvider: React.FC = ({ children }) => (
  <BrowserRouter>
    <HelmetProvider>{children}</HelmetProvider>
  </BrowserRouter>
);

export default ReactRouteManagerBrowserProvider;
