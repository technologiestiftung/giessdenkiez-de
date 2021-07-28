import { useAuth0 } from '@auth0/auth0-react';
import { deleteAccount } from '../requests/deleteAccount';
import { useAuth0Token } from './useAuth0Token';

export const useAccountActions = (): {
  logout: () => void;
  login: () => void;
  deleteAccount: () => Promise<void>;
} => {
  const { user, logout, loginWithRedirect } = useAuth0();
  const token = useAuth0Token();

  return {
    logout: () => {
      if (!user?.sub) return;
      logout({ returnTo: window.location.origin });
    },
    login: () => {
      loginWithRedirect({ ui_locales: 'de' });
    },
    deleteAccount: async () => {
      if (!user?.sub || !token) return;
      await deleteAccount({ token, userId: user.sub });
      logout({ returnTo: window.location.origin });
    },
  };
};
