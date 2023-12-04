import { useSession } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';

export const useSupabaseToken = () => {
  const [token, setToken] = useState<string | undefined>(undefined);
  const session = useSession();

  useEffect(() => {
    if (!session) return;
    const getToken = async () => {
      try {
        const token = session.access_token;
        setToken(token ?? undefined);
        return token;
      } catch (err) {
        console.error(err);
        return undefined;
      }
    };
    getToken().catch(console.error);
  }, [session]);

  return token;
};
