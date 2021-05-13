import { ExtendedFeatureCollection } from 'd3-geo';
import { requests } from '../requestUtil';

export const loadWaterSourcesData = async (): Promise<ExtendedFeatureCollection> => {
  return await requests<ExtendedFeatureCollection>(
    '/data/water-sources.json'
  );
};
