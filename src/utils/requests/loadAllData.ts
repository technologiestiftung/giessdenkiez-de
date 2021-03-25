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
  pumps: StoreProps['pumps'];
  wateredTrees: StoreProps['wateredTrees'];
  data: StoreProps['data'];
}> => {
  const [pumps, wateredTrees, data] = await Promise.all([
    loadPumpsData(),
    getWateredTrees(),
    loadTrees(),
  ]);
  return { pumps, wateredTrees, data };
};
