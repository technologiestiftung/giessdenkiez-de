import { ExtendedFeatureCollection } from 'd3-geo';
import { requests } from '../requestUtil';

export const loadPumpsData = async (): Promise<ExtendedFeatureCollection> => {
  return await requests<ExtendedFeatureCollection>(
    '/data/pumps.geojson.min.json'
  );
};
