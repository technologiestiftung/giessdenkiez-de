import { QueryFunction, useQuery } from 'react-query';
import { ExtendedFeatureCollection } from 'd3-geo';
import { loadTreesGeoJson } from '../requests/loadTreesGeoJson';
import { isMobile } from 'react-device-detect';

const loadData: QueryFunction = async (): Promise<ExtendedFeatureCollection> => {
  if (isMobile) {
    return { type: 'FeatureCollection', features: [] };
  } else {
    return await loadTreesGeoJson();
  }
};

export const useTreesGeoJson = (): {
  data: ExtendedFeatureCollection | null;
  error: Error | null;
} => {
  const dataParams = 'trees-geojson';
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
