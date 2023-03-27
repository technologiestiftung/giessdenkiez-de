import { useSupabaseClient } from '@supabase/auth-helpers-react';
import {
  QueryFunction,
  useQueryClient,
  useQuery,
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query';
import { Database } from '../../common/database';
import { getUserProfile } from '../requests/getUserProfile';
import { useSupabaseToken } from './useSupabaseToken';
import { useSupabaseUser } from './useSupabaseUser';

type RefetchType = <TPageData>(
  options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
) => Promise<
  QueryObserverResult<
    | {
        id: string;
        username: string | null;
      }
    | undefined,
    Error
  >
>;
const fetchUserProfile: QueryFunction<
  Database['public']['Tables']['profiles']['Row'] | undefined
> = async ({ queryKey }) => {
  const [, token, userId] = queryKey;
  if (
    !token ||
    !userId ||
    typeof token !== 'string' ||
    typeof userId !== 'string'
  )
    return undefined;
  const data = await getUserProfile({ userId, token });
  return data;
};
export const useUserProfile = (): {
  userProfile: Database['public']['Tables']['profiles']['Row'] | undefined;
  error: Error | null;
  refetch: RefetchType;
  invalidate: () => void;
} => {
  const user = useSupabaseUser();
  const queryClient = useQueryClient();
  const token = useSupabaseToken();

  const queryParams = ['userProfile', token, user?.id];
  const { data: userProfile, error, refetch } = useQuery<
    Database['public']['Tables']['profiles']['Row'] | undefined,
    Error
  >(queryParams, fetchUserProfile, { staleTime: Infinity });
  return {
    userProfile,
    refetch,
    error,
    invalidate: () => queryClient.invalidateQueries(queryParams),
  };
};
