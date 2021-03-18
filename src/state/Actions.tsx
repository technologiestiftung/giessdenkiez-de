import { isMobile } from 'react-device-detect';
import history from '../history';
import {
  createAPIUrl,
  requests,
  loadCommunityData as loadCommunityD,
} from '../utils';
import { Store } from 'unistore';
import {
  SelectedTreeType,
  StoreProps,
  ViewportType,
} from '../common/interfaces';
import { TreeLastWateredType } from '../common/types';
import { loadTreesGeoJson } from '../utils/requests/loadTreesGeoJson';
import { loadRainGeoJson } from '../utils/requests/loadRainGeoJson';
import { loadPumpsData } from '../utils/requests/loadPumpsData';
import { getWateredTrees as getWateredTreesReq } from '../utils/requests/getWateredTrees';

interface TreeLastWateredResponseType {
  data: TreeLastWateredType | undefined;
}

interface SelectedTreeResponseType {
  data: SelectedTreeType[];
}

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
  const newState = await loadCommunityD();

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

const calcuateRadolan = (radolanDays: number): number => radolanDays / 10;

const parseSelectedTreeResponse = (
  selectedTreeResponse: SelectedTreeResponseType
) => {
  const selectedTree = selectedTreeResponse.data[0];
  // ISSUE:141
  return {
    ...selectedTree,
    radolan_days: selectedTree.radolan_days.map(calcuateRadolan),
    radolan_sum: calcuateRadolan(selectedTree.radolan_sum),
  };
};

const parseTreeLastWateredResponse = (
  treeLastWateredResponse: TreeLastWateredResponseType
): TreeLastWateredType => treeLastWateredResponse.data || [];

export const getTree = async (
  id: string
): Promise<{
  treeLastWatered?: TreeLastWateredType;
  selectedTree?: SelectedTreeType;
}> => {
  try {
    const urlSelectedTree = createAPIUrl(`/get?queryType=byid&id=${id}`);
    const urlLastWatered = createAPIUrl(`/get?queryType=lastwatered&id=${id}`);

    const [resSelectedTree, resLastWatered] = await Promise.all([
      requests<SelectedTreeResponseType>(urlSelectedTree),
      requests<TreeLastWateredResponseType>(urlLastWatered),
    ]);
    const treeLastWatered = parseTreeLastWateredResponse(resLastWatered);

    if (resSelectedTree.data.length > 0) {
      return {
        selectedTree: parseSelectedTreeResponse(
          resSelectedTree as SelectedTreeResponseType
        ),
        treeLastWatered,
      };
    } else {
      return {
        selectedTree: undefined,
        treeLastWatered,
      };
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const removeSelectedTree = (): {
  selectedTree: boolean;
  selectedTreeState: boolean;
} => ({
  selectedTree: false,
  selectedTreeState: false,
});

export const getTreeByAge = (store: Store<StoreProps>) => async (
  start: string,
  end: string
): Promise<void> => {
  try {
    store.setState({ selectedTreeState: 'LOADING' });
    const url = createAPIUrl(`/get?queryType=byage&start=${start}&end=${end}`);

    const res = await requests(url);

    store.setState({
      selectedTreeState: 'LOADED',
      selectedTree: res.data,
    });
  } catch (error) {
    console.error(error);
  }
};

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
  getTree,
  getTreeByAge: getTreeByAge(Store),
  setDetailRouteWithListPath,
  setViewport,
  setView,
  extendView,
  loadTrees: loadTrees(Store),
  removeSelectedTree,
  setAgeRange,
  toggleOverlay,
});
