import {
  User,
  useSession,
  useSupabaseClient,
} from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';

export const useSupabaseUser = () => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const session = useSession();
  const supabase = useSupabaseClient();

  useEffect(() => {
    if (!session) return;
    const getUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        // const user = session.user;
        setUser(user ?? undefined);
        console.log(user, 'user');
        return user;
      } catch (err) {
        console.error(err);
        return undefined;
      }
    };
    getUser().catch(console.error);
  }, [session, supabase]);

  return user;
};
