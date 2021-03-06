import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

/**
 * Routed is a wrapper for setting up the `BrowserRouter` as well as a `HelmetProvider` for dynamically updating the page title on the fly
 *
 * Ensure that the main component is wrapped by this function
 */
export const BrowserProvider: React.FC = ({ children }) => (
  <BrowserRouter>
    <HelmetProvider>{children}</HelmetProvider>
  </BrowserRouter>
);
