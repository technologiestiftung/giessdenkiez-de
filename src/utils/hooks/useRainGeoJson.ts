import { QueryFunction, useQuery } from 'react-query';
import { ExtendedFeatureCollection } from 'd3-geo';
import { loadRainGeoJson } from '../requests/loadRainGeoJson';

var isLocalTesting = process.env.LOCAL_TESTING

const loadData: QueryFunction = async (): Promise<ExtendedFeatureCollection> => {
  if (isLocalTesting) { 
    return Promise.resolve(
      {
        "type": "FeatureCollection",
        "properties": {
            "start": "2021-06-06 00:50:00",
            "end": "2021-07-05 23:50:00"
        },
        "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "MultiPolygon",
                    "coordinates": [[[[12.43489, 51.46228], [12.44866, 51.46191], [12.44808, 51.45333], [12.46185, 51.45296], [12.46126, 51.44438], [12.43372, 51.44511], [12.43489, 51.46228]]]]
                },
                "properties": {
                    "id": 8911,
                    "data": [477]
                }
            }
      ]
    }    
    )
  } else {
    return await loadRainGeoJson();
  }
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
