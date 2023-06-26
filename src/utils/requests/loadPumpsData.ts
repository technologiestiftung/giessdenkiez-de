import { ExtendedFeatureCollection } from 'd3-geo';
import { requests } from '../requestUtil';

export const loadPumpsData = async (): Promise<ExtendedFeatureCollection> =>
    await requests<ExtendedFeatureCollection>(process.env.NEXT_PUBLIC_PUMPS_DATA_URL);
