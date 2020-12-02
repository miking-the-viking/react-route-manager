import React, { useEffect, useMemo, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const {
  NX_AUTH0_DOMAIN: domain,
  NX_AUTH0_CLIENT_ID: clientId,
  NX_AUTH0_REDIRECT: redirectUri,
  NX_AUTH0_AUDIENCE: audience,
} = process.env;

const LoggedIn = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0();

  const [token, setToken] = useState<string>();

  useEffect(() => {
    (async () => {
      setToken(
        await getAccessTokenSilently({
          audience,
        })
      );
    })();
  }, [getAccessTokenSilently]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <p>Token: {token}</p>
      </div>
    )
  );
};

export default LoggedIn;
