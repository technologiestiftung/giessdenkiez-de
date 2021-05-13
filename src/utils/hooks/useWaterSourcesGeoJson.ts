import { QueryFunction, useQuery } from 'react-query';
import { ExtendedFeatureCollection } from 'd3-geo';
import { loadWaterSourcesData } from '../requests/loadWaterSourcesData';

const loadData: QueryFunction = async (): Promise<ExtendedFeatureCollection> => {
  return await loadWaterSourcesData();
};

export const useWaterSourcesGeoJson = (): {
  data: ExtendedFeatureCollection | null;
  error: Error | null;
} => {
  const dataParams = 'watersources-geojson';
  const { data, error } = useQuery<unknown, Error, ExtendedFeatureCollection>(
    dataParams,
    loadData,
    { staleTime: Infinity }
  );

  return {
    data: data || null,
    error: error || null,
  };
};
