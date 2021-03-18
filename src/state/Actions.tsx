import { isMobile } from 'react-device-detect';
import history from '../history';
import { Store } from 'unistore';
import { StoreProps, ViewportType } from '../common/interfaces';
import { loadTreesGeoJson } from '../utils/requests/loadTreesGeoJson';
import { loadRainGeoJson } from '../utils/requests/loadRainGeoJson';
import { loadPumpsData } from '../utils/requests/loadPumpsData';
import { getCommunityData } from '../utils/requests/getCommunityData';
import { getWateredTrees as getWateredTreesReq } from '../utils/requests/getWateredTrees';

export const loadTrees = (
  store: Store<StoreProps>
) => async (): Promise<void> => {
  if (isMobile) {
    store.setState({
      data: {
        type: 'FeatureCollection',
        features: [],
      },
      isTreeDataLoading: false,
    });
  } else {
    const geoJson = await loadTreesGeoJson();
    store.setState({ data: geoJson, isTreeDataLoading: false });
  }
};

export const setAgeRange = (
  _state: StoreProps,
  payload: StoreProps['ageRange']
): {
  ageRange: StoreProps['ageRange'];
} => {
  return {
    ageRange: payload,
  };
};

export const loadCommunityData = (
  store: Store<StoreProps>
): (() => Promise<void>) => async () => {
  const newState = await getCommunityData();
  store.setState(newState);
};

export const loadData = (
  store: Store<StoreProps>
) => async (): Promise<void> => {
  try {
    store.setState({ isTreeDataLoading: true });

    const [rainGeojson, pumpsGeojson] = await Promise.all([
      loadRainGeoJson(),
      loadPumpsData(),
    ]);
    store.setState({ rainGeojson: rainGeojson, pumps: pumpsGeojson });
  } catch (error) {
    console.error(error);
  }
};

function setViewport(
  state: StoreProps,
  [latitude, longitude]: [number, number]
): { viewport: ViewportType } {
  // TODO: lat long are reversed in the database
  // that is why we need to switch them here.
  return {
    viewport: {
      ...state.viewport,
      latitude: longitude,
      longitude: latitude,
      transitionDuration: 2000,
    },
  };
}

function setView(
  _state: StoreProps,
  payload: ViewportType
): { viewport: ViewportType } {
  return {
    viewport: {
      ...payload,
      transitionDuration: 0,
    },
  };
}

function extendView(
  state: StoreProps,
  payload: Partial<ViewportType>
): { viewport: ViewportType } {
  return {
    viewport: {
      ...state.viewport,
      ...payload,
      transitionDuration: 2000,
    },
  };
}

export const getWateredTrees = (Store: Store<StoreProps>) => async (): Promise<{
  wateredTrees: StoreProps['wateredTrees'];
}> => {
  try {
    Store.setState({ isTreeDataLoading: true });
    const wateredTrees = await getWateredTreesReq();

    return { wateredTrees };
  } catch (error) {
    console.error(error);
    return { wateredTrees: [] };
  }
};

export const removeSelectedTree = (): {
  selectedTree: boolean;
  selectedTreeState: boolean;
} => ({
  selectedTree: false,
  selectedTreeState: false,
});

export const toggleOverlay: (
  _state: StoreProps,
  payload: StoreProps['overlay']
) => { overlay: StoreProps['overlay'] } = (_state, payload) => ({
  overlay: payload,
});

const setDetailRouteWithListPath = (_state: StoreProps, treeId: string) => {
  const nextLocation = `/search?location=${treeId}`;
  history.push(nextLocation);
};

export default (Store: Store<StoreProps>) => ({
  loadData: loadData(Store),
  getWateredTrees: getWateredTrees(Store),
  loadCommunityData: loadCommunityData(Store),
  loadTrees: loadTrees(Store),
  setDetailRouteWithListPath,
  setViewport,
  setView,
  extendView,
  removeSelectedTree,
  setAgeRange,
  toggleOverlay,
});
