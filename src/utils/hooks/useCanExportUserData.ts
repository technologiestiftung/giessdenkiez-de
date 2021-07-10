import { QueryFunction, useQuery, useQueryClient } from 'react-query';
import { canExportUserData } from '../requests/canExportUserData';
import { useAuth0Token } from './useAuth0Token';

const fetchCanExportUserData: QueryFunction<boolean | undefined> = async ({
  queryKey,
}) => {
  const [, token] = queryKey;
  if (!token) return undefined;
  return canExportUserData({ token });
};

export const useCanExportUserData = (): {
  canExportUserData: boolean | undefined;
  error: Error | null;
  invalidate: () => void;
} => {
  const token = useAuth0Token();
  const queryClient = useQueryClient();

  const queryParams = ['canExportUserData', token];
  const { data: canExportUserData, error } = useQuery<
    boolean | undefined,
    Error | null
  >(queryParams, fetchCanExportUserData, { staleTime: Infinity });

  return {
    canExportUserData,
    error,
    invalidate: () => queryClient.invalidateQueries(queryParams),
  };
};
