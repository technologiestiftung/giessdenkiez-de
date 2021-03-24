import { QueryFunction, useQuery, useQueryClient } from 'react-query';
import { Tree } from '../../common/interfaces';
import { useAuth0 } from '../auth/auth0';
import { adoptTree } from '../requests/adoptTree';
import { getUserData } from '../requests/getUserData';
import { unadoptTree } from '../requests/unadoptTree';
import { useAuth0Token } from './useToken';

interface UserDataType {
  id: string;
  email: string;
  isVerified: boolean;
  adoptedTrees: Tree[];
}

type UserDataError = Error | null;
type OptionalUserType = UserDataType | undefined;

const fetchUserData: QueryFunction<OptionalUserType> = async ({ queryKey }) => {
  const [_key, token, userId] = queryKey;
  if (!token || !userId) return undefined;
  const userData = await getUserData({ userId, token });
  return userData;
};

export const useUserData = (): {
  userData: OptionalUserType;
  error: Error | null;
  logout: () => void;
  adoptTree: (treeId: string) => void;
  unadoptTree: (treeId: string) => void;
} => {
  const { user, logout } = useAuth0();
  const token = useAuth0Token();
  const queryClient = useQueryClient();

  const queryParams = ['userData', token, user?.sub];
  const { data: userData, error } = useQuery<OptionalUserType, UserDataError>(
    queryParams,
    fetchUserData,
    { staleTime: 10000 }
  );

  return {
    userData,
    error,
    logout: () => {
      user?.sub && logout();
      queryClient.invalidateQueries(queryParams);
    },
    adoptTree: async (treeId: string): Promise<void> => {
      if (!user?.sub || !token) return;
      await adoptTree(treeId, token, user.sub);
      queryClient.invalidateQueries(queryParams);
    },
    unadoptTree: async (treeId: string): Promise<void> => {
      if (!user?.sub || !token) return;
      await unadoptTree(treeId, token, user.sub);
      queryClient.invalidateQueries(queryParams);
    },
  };
};
