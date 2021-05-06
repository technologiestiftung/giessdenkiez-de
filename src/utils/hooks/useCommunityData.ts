import { QueryFunction, useQuery, useQueryClient } from 'react-query';
import { CommunityDataType } from '../../common/interfaces';
import { getCommunityData } from '../requests/getCommunityData';

const loadData: QueryFunction = async (): Promise<CommunityDataType> => {
  return await getCommunityData();
};

export const useCommunityData = (): {
  data: CommunityDataType | null;
  error: Error | null;
  invalidate: () => void;
} => {
  const queryClient = useQueryClient();
  const dataParams = 'community-data';
  const { data, error } = useQuery<unknown, Error, CommunityDataType>(
    dataParams,
    loadData,
    { staleTime: Infinity }
  );

  return {
    data: data || null,
    error: error || null,
    invalidate: () => queryClient.invalidateQueries(dataParams),
  };
};
