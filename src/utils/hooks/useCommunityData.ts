import { useAuth0 } from '@auth0/auth0-react';
import { useQuery, useQueryClient } from 'react-query';
import { CommunityDataType } from '../../common/interfaces';
import { getCommunityData } from '../requests/getCommunityData';
import { useAuth0Token } from './useAuth0Token';

const loadData = async (
  token: string | undefined,
  uuid: string | undefined
): Promise<CommunityDataType> => {
  return await getCommunityData(token, uuid);
};

export const useCommunityData = (): {
  data: CommunityDataType | null;
  error: Error | null;
  invalidate: () => void;
} => {
  const token = useAuth0Token();
  const { user } = useAuth0();
  const queryClient = useQueryClient();
  const dataParams = token ? 'community-data-loggedin' : 'community-data';
  const { data, error } = useQuery<unknown, Error, CommunityDataType>(
    dataParams,
    async () => await loadData(token, user?.sub),
    { staleTime: Infinity }
  );

  return {
    data: data || null,
    error: error || null,
    invalidate: () => queryClient.invalidateQueries(dataParams),
  };
};
