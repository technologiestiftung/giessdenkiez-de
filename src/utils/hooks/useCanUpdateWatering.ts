import { QueryFunction, useQuery, useQueryClient } from 'react-query';
import { canUpdateWatering } from '../requests/canUpdateWatering';
import { useAuth0Token } from './useAuth0Token';

const fetchCanUpdateWatering: QueryFunction<boolean | undefined> = async ({
  queryKey,
}) => {
  const [, token] = queryKey;
  if (!token) return undefined;
  return canUpdateWatering({ token });
};

export const useCanUpdateWatering = (): {
  canUpdateWatering: boolean | undefined;
  error: Error | null;
  invalidate: () => void;
} => {
  const token = useAuth0Token();
  const queryClient = useQueryClient();

  const queryParams = ['canUpdateWatering', token];
  const { data: canUpdateWatering, error } = useQuery<
    boolean | undefined,
    Error | null
  >(queryParams, fetchCanUpdateWatering, { staleTime: Infinity });

  return {
    canUpdateWatering,
    error,
    invalidate: () => queryClient.invalidateQueries(queryParams),
  };
};
