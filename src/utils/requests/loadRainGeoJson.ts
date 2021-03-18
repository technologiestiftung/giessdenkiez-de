import { ExtendedFeatureCollection } from 'd3-geo';
import { requests } from '../requestUtil';

export const loadRainGeoJson = async (): Promise<ExtendedFeatureCollection> => {
  const dataUrl =
    'https://tsb-trees.s3.eu-central-1.amazonaws.com/weather_light.geojson.gz';

  return await requests<ExtendedFeatureCollection>(dataUrl);
};
