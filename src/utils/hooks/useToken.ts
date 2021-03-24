import { useEffect, useState } from 'react';
import { useAuth0 } from '../auth/auth0';

export const useAuth0Token = (): string | undefined => {
  const [token, setToken] = useState<string | undefined>(undefined);
  const { getTokenSilently } = useAuth0();

  useEffect(() => {
    getTokenSilently()
      .then((token: string) => setToken(token))
      .catch(console.error);
  }, []);

  return token;
};
