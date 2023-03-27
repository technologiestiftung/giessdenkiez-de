import { QueryFunction, useQuery, useQueryClient } from 'react-query';
import { OptionalUserDataType, UserDataType } from '../../common/interfaces';
import { getUserData } from '../requests/getUserData';
import { useSupabaseUser } from './useSupabaseUser';
import { useSupabaseToken } from './useSupabaseToken';
import { useUserProfile } from './useUserProfile';
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
  const { userProfile } = useUserProfile();

  const token = useSupabaseToken();
  const queryClient = useQueryClient();

  const queryParams = ['userData', token, user?.id];
  const { data: partialUserData, error } = useQuery<
    OptionalUserDataType | undefined,
    UserDataError
  >(queryParams, fetchUserData, { staleTime: Infinity });

  let userData: UserDataType | undefined;
  if (user && partialUserData && userProfile) {
    userData = {
      id: user.id,
      email: user.email!,
      isVerified: user.email_confirmed_at !== undefined ? true : false,
      username: userProfile.username ?? '',
      ...partialUserData,
    };
  }
  return {
    userData,
    error,
    invalidate: () => queryClient.invalidateQueries(queryParams),
  };
};
