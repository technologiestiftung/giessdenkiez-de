import { ExtendedFeatureCollection } from 'd3-geo';
import { requests } from '../requestUtil';

export const loadPumpsData = async (): Promise<ExtendedFeatureCollection> => {
  if(!process.env.NEXT_PUBLIC_PUMPS_DATA_URL) throw new Error("env var NEXT_PUBLIC_PUMPS_DATA_URL should be defiend in your environment");
  return await requests<ExtendedFeatureCollection>(process.env.NEXT_PUBLIC_PUMPS_DATA_URL);
};
