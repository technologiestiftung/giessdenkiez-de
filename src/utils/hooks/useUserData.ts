import { QueryFunction, useQuery, useQueryClient } from 'react-query';
import { OptionalUserDataType, UserDataType } from '../../common/interfaces';
import { getUserData } from '../requests/getUserData';
import { useSupabaseUser } from './useSupabaseUser';
import { useSupabaseToken } from './useSupabaseToken';
import { useSupabaseProfile } from './useSupabaseProfile';
type UserDataError = Error | null;

const fetchUserData: QueryFunction<OptionalUserDataType | undefined> = async ({
  queryKey,
}) => {
  const [, token, userId] = queryKey;
  if (
    !token ||
    !userId ||
    typeof token !== 'string' ||
    typeof userId !== 'string'
  )
    return undefined;
  const userData = await getUserData({ userId, token });
  return userData;
};

export const useUserData = (): {
  userData: UserDataType | undefined;
  error: Error | null;
  invalidate: () => void;
} => {
  const user = useSupabaseUser();
  const profile = useSupabaseProfile();

  const token = useSupabaseToken();
  const queryClient = useQueryClient();

  const queryParams = ['userData', token, user?.id];
  const { data: partialUserData, error } = useQuery<
    OptionalUserDataType | undefined,
    UserDataError
  >(queryParams, fetchUserData, { staleTime: Infinity });

  let userData: UserDataType | undefined;
  if (user && partialUserData && profile) {
    userData = {
      id: user.id,
      email: user.email!,
      isVerified: user.email_confirmed_at !== undefined ? true : false,
      username: profile.username!,
      ...partialUserData,
    };
  }
  return {
    userData,
    error,
    invalidate: () => queryClient.invalidateQueries(queryParams),
  };
};
