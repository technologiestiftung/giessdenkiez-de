import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const useAuth0Token = (): string | undefined => {
  const [token, setToken] = useState<string | undefined>(undefined);
  const { user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (!user?.sub || !getAccessTokenSilently) return;
    const getToken = async () => {
      try {
        const token = await getAccessTokenSilently();
        setToken(token || undefined);
        return token;
      } catch (err) {
        console.error(err);
        return undefined;
      }
    };
    getToken();
  }, [getAccessTokenSilently, user]);

  return token;
};
