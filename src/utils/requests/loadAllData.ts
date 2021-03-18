import { loadRainGeoJson } from './loadRainGeoJson';
import { loadPumpsData } from './loadPumpsData';
import { StoreProps } from '../../common/interfaces';
import { getWateredTrees } from './getWateredTrees';
import { isMobile } from 'react-device-detect';
import { loadTreesGeoJson } from './loadTreesGeoJson';
import { getCommunityData } from './getCommunityData';

const loadTrees = async () => {
  if (isMobile) {
    return { type: 'FeatureCollection', features: [] };
  } else {
    return await loadTreesGeoJson();
  }
};

export const loadAllData = async (): Promise<{
  rainGeojson: StoreProps['rainGeojson'];
  pumps: StoreProps['pumps'];
  wateredTrees: StoreProps['wateredTrees'];
  data: StoreProps['data'];
  communityData: StoreProps['communityData'];
  communityDataAdopted: StoreProps['communityDataAdopted'];
  communityDataWatered: StoreProps['communityDataWatered'];
}> => {
  const [
    rainGeojson,
    pumps,
    wateredTrees,
    data,
    communityData,
  ] = await Promise.all([
    loadRainGeoJson(),
    loadPumpsData(),
    getWateredTrees(),
    loadTrees(),
    getCommunityData(),
  ]);
  return { rainGeojson, pumps, wateredTrees, data, ...communityData };
};
