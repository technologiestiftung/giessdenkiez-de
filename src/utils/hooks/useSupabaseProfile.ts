import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import { Database } from '../../common/database';

export const useSupabaseProfile = () => {
  const supabase = useSupabaseClient<Database>();
  const [profile, setProfile] = useState<
    Database['public']['Tables']['profiles']['Row'] | null
  >(null);

  const session = useSession();

  useEffect(() => {
    if (!session) return;
    const getProfile = async () => {
      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user?.id)
          .single();
        if (error) throw error;
        setProfile(profile ?? null);
        return profile;
      } catch (err) {
        console.error(err);
        return null;
      }
    };
    getProfile().catch(console.error);
  }, [session, supabase]);
  return profile;
};
