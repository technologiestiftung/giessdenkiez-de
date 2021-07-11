import { QueryFunction, useQuery, useQueryClient } from 'react-query';
import { UserDataType } from '../../common/interfaces';
import { useAuth0 } from '@auth0/auth0-react';
import { getUserData } from '../requests/getUserData';
import { useAuth0Token } from './useAuth0Token';

type UserDataError = Error | null;

const fetchUserData: QueryFunction<UserDataType | undefined> = async ({
  queryKey,
}) => {
  const [, token, userId] = queryKey;
  if (!token || !userId) return undefined;
  const userData = await getUserData({ userId, token });
  return userData;
};

export const useUserData = (): {
  userData: UserDataType | undefined;
  error: Error | null;
  invalidate: () => void;
} => {
  const { user } = useAuth0();
  const token = useAuth0Token();
  const queryClient = useQueryClient();

  const queryParams = ['userData', token, user?.sub];
  const { data: userData, error } = useQuery<
    UserDataType | undefined,
    UserDataError
  >(queryParams, fetchUserData, { staleTime: Infinity });

  return {
    userData,
    error,
    invalidate: () => queryClient.invalidateQueries(queryParams),
  };
};
