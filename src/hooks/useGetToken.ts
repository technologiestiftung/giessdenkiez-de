import { useEffect, useState } from 'react';
import { useAuth0 } from '../utils/auth/auth0';

/**
 * Still WIP. I need to figure out how to make this failsafe so we can be sure we return a token.
 * @returns string | undefined
 */
export function useGetTokenSilently(): string {
  const { getTokenSilently } = useAuth0();
  const [token, setToken] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (!getTokenSilently) return;
    if (!token) return;
    getTokenSilently()
      .then(t => {
        setToken(_ => t);
        return;
      })
      .catch(console.error);
  }, [getTokenSilently, token]);
  return token;
}
