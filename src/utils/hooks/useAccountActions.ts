import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Router from 'next/router';
import { deleteAccount } from '../requests/deleteAccount';
import { useSupabaseToken } from './useSupabaseToken';
import { useSupabaseUser } from './useSupabaseUser';

export const useAccountActions = (): {
  logout: () => void;
  login: () => void;
  deleteAccount: () => Promise<void>;
} => {
  const user = useSupabaseUser();
  const supabase = useSupabaseClient();
  // const { user, logout, loginWithRedirect } = useAuth0();
  const token = useSupabaseToken();

  return {
    logout: async () => {
      if (!user?.id) return;
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error(error);
        return;
      }
      Router.push('/');

      // logout({ returnTo: window.location.origin });
    },
    login: () => {
      Router.push('/auth');
      // loginWithRedirect({ ui_locales: 'de' });
    },
    deleteAccount: async () => {
      if (!user?.id || !token) return;
      await deleteAccount({ token });
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error(error);
        return;
      }
      Router.push('/');
    },
  };
};
