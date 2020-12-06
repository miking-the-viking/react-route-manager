import { Auth0Provider } from "@auth0/auth0-react";
import React, { useCallback } from "react";
import { useNavigate } from "react-router";
import { AuthConfigParams } from "./types";

export const AuthProvider: React.FC<AuthConfigParams> = ({
  domain,
  clientId,
  audience,
  redirectUri,
  children,
}) => {
  const navigate = useNavigate();
  const onRedirectCallback = useCallback(
    (appState) => {
      const destination =
        appState && appState.returnTo
          ? appState.returnTo
          : window.location.pathname;
      navigate(destination);
    },
    [navigate]
  );

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      audience={audience}
      redirectUri={redirectUri}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};
