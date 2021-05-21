import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect } from 'react';

const LoadingFallback = () => <p>Loading Auth State ...</p>;

export const RequiresKnownAuthState: React.FC = ({ children }) => {
  const {
    getAccessTokenSilently,
    isAuthenticated,
    isLoading,
    error,
  } = useAuth0();

  useEffect(() => {
    (async () => {
      let token;
      if (isAuthenticated) {
        token = await getAccessTokenSilently();
      }
      if (token && token.length > 0) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem(token);
      }
    })();
  }, [isAuthenticated, getAccessTokenSilently]);

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <LoadingFallback />;
  }

  return <div>{children}</div>;
};
