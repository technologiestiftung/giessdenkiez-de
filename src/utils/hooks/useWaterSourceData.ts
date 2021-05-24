import { QueryFunction, useQuery, useQueryClient } from 'react-query';
import { SelectedWaterSourceType } from '../../common/interfaces';
import { getWaterSourceData } from '../requests/getWaterSourceData';
import { useWaterSourcesGeoJson } from '../../utils/hooks/useWaterSourcesGeoJson';

const loadWaterSource: QueryFunction<SelectedWaterSourceType | undefined> = async ({
  queryKey,
}) => {
  const [, waterSourceId, waterSources] = queryKey;
  if (!waterSourceId) return undefined;
  const data = await getWaterSourceData(waterSourceId, waterSources);
  if (!data.selectedWaterSourceData) {
    throw new Error('Wasserquelle nicht gefunden. Probiere eine andere ...');
  }
  return data.selectedWaterSourceData;
};

export const useWaterSourceData = (
  waterSourceId: string | undefined | null
): {
  waterSourceData: SelectedWaterSourceType | undefined;
  error: Error | null;
  invalidate: () => void;
} => {
  const queryClient = useQueryClient();

  const waterSourceDataParams = [`waterSource-${waterSourceId}`, waterSourceId, useWaterSourcesGeoJson().data];
  const { data: waterSourceData, error } = useQuery<
    SelectedWaterSourceType | undefined,
    Error
  >(waterSourceDataParams, loadWaterSource, {
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return {
    waterSourceData,
    error,
    invalidate: () => {
      queryClient.invalidateQueries(waterSourceDataParams);
    },
  };
};
