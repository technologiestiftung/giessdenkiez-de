import { loadRainGeoJson } from './loadRainGeoJson';
import { loadPumpsData } from './loadPumpsData';
import { StoreProps } from '../../common/interfaces';
import { getWateredTrees } from './getWateredTrees';
import { isMobile } from 'react-device-detect';
import { loadTreesGeoJson } from './loadTreesGeoJson';

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
}> => {
  const [rainGeojson, pumps, wateredTrees, data] = await Promise.all([
    loadRainGeoJson(),
    loadPumpsData(),
    getWateredTrees(),
    loadTrees(),
  ]);
  return { rainGeojson, pumps, wateredTrees, data };
};
