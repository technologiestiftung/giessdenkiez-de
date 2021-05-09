import { useEffect, useState } from 'react';
import { useAuth0 } from '../auth/auth0';

export const useAuth0Token = (): string | undefined => {
  const [token, setToken] = useState<string | undefined>(undefined);
  const { user, getTokenSilently } = useAuth0();

  useEffect(() => {
    if (!user?.sub || !getTokenSilently) return;
    const getToken = async () => {
      try {
        const token = await getTokenSilently();
        setToken(token || undefined);
        return token;
      } catch (err) {
        console.error(err);
        return undefined;
      }
    };
    getToken();
  }, [getTokenSilently, user]);

  return token;
};
