import React from "react";
import { AuthProvider } from "@react-route-manager/ui-components";

const {
  NX_AUTH0_DOMAIN: domain,
  NX_AUTH0_CLIENT_ID: clientId,
  NX_AUTH0_REDIRECT: redirectUri,
  NX_AUTH0_AUDIENCE: audience,
} = process.env;

console.log(
  `domain: ${domain}, clientId: ${clientId}, redirectUri: ${redirectUri}, audience: ${audience}`
);

const AUTH_PROVIDER_CONFIG = {
  audience,
  clientId,
  domain,
  redirectUri,
};

export const InnerBrowserRouterContext: React.FC = ({ children }) => (
  <AuthProvider {...AUTH_PROVIDER_CONFIG}>{children}</AuthProvider>
);
