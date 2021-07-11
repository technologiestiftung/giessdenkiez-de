import { QueryFunction, useQuery } from 'react-query';
import { ExtendedFeatureCollection } from 'd3-geo';
import { loadRainGeoJson } from '../requests/loadRainGeoJson';

const loadData: QueryFunction = async (): Promise<ExtendedFeatureCollection> => {
  return await loadRainGeoJson();
};

export const useRainGeoJson = (): {
  data: ExtendedFeatureCollection | null;
  error: Error | null;
} => {
  const dataParams = 'rain-geojson';
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
