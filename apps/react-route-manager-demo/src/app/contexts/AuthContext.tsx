import React from 'react';
import {
  AuthProvider,
  RequiresKnownAuthState,
} from '@react-route-manager/ui-components';

const {
  NX_AUTH0_DOMAIN: domain,
  NX_AUTH0_CLIENT_ID: clientId,
  NX_AUTH0_REDIRECT: redirectUri,
  NX_AUTH0_AUDIENCE: audience,
} = process.env;

const AUTH_PROVIDER_CONFIG = {
  audience,
  clientId,
  domain,
  redirectUri,
};

export const AuthContext: React.FC = ({ children }) => (
  <AuthProvider {...AUTH_PROVIDER_CONFIG}>
    <RequiresKnownAuthState>{children}</RequiresKnownAuthState>
  </AuthProvider>
);
