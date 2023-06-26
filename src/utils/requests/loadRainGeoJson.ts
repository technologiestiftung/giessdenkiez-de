import { ExtendedFeatureCollection } from 'd3-geo';
import { requests } from '../requestUtil';

export const loadRainGeoJson = async (): Promise<ExtendedFeatureCollection> =>
    await requests<ExtendedFeatureCollection>(process.env.NEXT_PUBLIC_RAIN_DATA_URL);
