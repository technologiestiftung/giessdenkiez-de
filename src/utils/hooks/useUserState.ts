import { QueryFunction, useQuery, useQueryClient } from 'react-query';
import { UserDataType } from '../../common/interfaces';
import { useAuth0 } from '../auth/auth0';
import { adoptTree } from '../requests/adoptTree';
import { deleteAccount } from '../requests/deleteAccount';
import { getUserData } from '../requests/getUserData';
import { unadoptTree } from '../requests/unadoptTree';
import { waterTree } from '../requests/waterTree';
import { useAuth0Token } from './useAuth0Token';

type UserDataError = Error | null;

const fetchUserData: QueryFunction<UserDataType | undefined> = async ({
  queryKey,
}) => {
  const [_key, token, userId] = queryKey;
  if (!token || !userId) return undefined;
  const userData = await getUserData({ userId, token });
  return userData;
};

export const useUserState = (): {
  userData: UserDataType | undefined;
  error: Error | null;
  logout: () => void;
  login: () => void;
  deleteAccount: () => Promise<void>;
  adoptTree: (treeId: string) => void;
  waterTree: (treeId: string, amount: number) => void;
  unadoptTree: (treeId: string) => void;
} => {
  const { user, logout, loginWithRedirect } = useAuth0();
  const token = useAuth0Token();
  const queryClient = useQueryClient();

  const queryParams = ['userData', token, user?.sub];
  const { data: userData, error } = useQuery<
    UserDataType | undefined,
    UserDataError
  >(queryParams, fetchUserData, { staleTime: 10000 });

  return {
    userData,
    error,
    logout: () => {
      if (!user?.sub) return;
      logout();
      queryClient.invalidateQueries(queryParams);
    },
    login: () => {
      loginWithRedirect({ ui_locales: 'de' });
    },
    deleteAccount: async () => {
      if (!user?.sub || !token) return;
      await deleteAccount({ token, userId: user.sub });
      logout();
      queryClient.invalidateQueries(queryParams);
    },
    waterTree: async (treeId: string, amount: number): Promise<void> => {
      if (!userData || !token) return;
      await waterTree({
        id: treeId,
        token,
        amount,
        userId: userData.id,
        username: userData.username,
      });
      queryClient.invalidateQueries(queryParams);
    },
    adoptTree: async (treeId: string): Promise<void> => {
      if (!user?.sub || !token) return;
      await adoptTree({ id: treeId, token, userId: user.sub });
      queryClient.invalidateQueries(queryParams);
    },
    unadoptTree: async (treeId: string): Promise<void> => {
      if (!user?.sub || !token) return;
      await unadoptTree({ id: treeId, token, userId: user.sub });
      queryClient.invalidateQueries(queryParams);
    },
  };
};
