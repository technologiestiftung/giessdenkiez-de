import { isMobile } from 'react-device-detect';
import { dsv as d3Dsv, easeCubic as d3EaseCubic } from 'd3';
import history from '../history';
import { createAPIUrl, createGeojson, requests } from '../utils';
import { FlyToInterpolator } from 'react-map-gl';
import { Store } from 'unistore';
import { StoreProps, Generic } from '../common/interfaces';
export const loadTrees = (store: Store<StoreProps>) => async () => {
  if (isMobile) {
    store.setState({
      data: {
        type: 'FeatureCollection',
        features: [],
      },
      isLoading: false,
    });
  } else {
    const dataUrl =
      'https://tsb-trees.s3.eu-central-1.amazonaws.com/trees.csv.gz';

    d3Dsv(',', dataUrl, { cache: 'force-cache' })
      .then(data => {
        const geojson = createGeojson(data);
        store.setState({ data: geojson, isLoading: false });
        return;
      })
      .catch(console.error);
  }
};

export const setAgeRange = (_state, payload) => {
  return {
    ageRange: payload,
  };
};

export const loadCommunityData = (store: Store<StoreProps>) => () => {
  const fetchCommunityDataUrl = createAPIUrl(
    store.getState(),
    `/get?queryType=wateredandadopted`
  );
  requests(fetchCommunityDataUrl)
    .then(json => {
      const obj = {};
      const communityDataWatered: Generic[] = [];
      const communityDataAdopted: Generic[] = [];
      // TODO: Review https://eslint.org/docs/rules/array-callback-return
      // create community data object for map
      if (json.data) {
        json.data.map(item => {
          obj[item.tree_id] = {
            adopted: item.adopted > 0 ? true : false,
            watered: item.watered > 0 ? true : false,
          };
          if (item.adopted > 0) {
            communityDataWatered.push(item.tree_id);
          }
          if (item.watered > 0) {
            communityDataAdopted.push(item.tree_id);
          }
        });
        store.setState({ communityData: obj });
        store.setState({ communityDataAdopted });
        store.setState({ communityDataWatered });
      }
      return;
    })
    .catch(console.error);
};

export const loadData = (store: Store<StoreProps>) => async () => {
  try {
    store.setState({ isLoading: true });
    // let geojson = [];

    const dataUrl =
      'https://tsb-trees.s3.eu-central-1.amazonaws.com/weather_light.geojson.gz';

    const rainGeojson = await requests(dataUrl);
    store.setState({ rainGeojson });
    // load min version
    const pumps = await requests('/data/pumps.geojson.min.json');
    store.setState({ pumps });
  } catch (error) {
    console.error(error);
  }
};

export const setAppState = (_state, payload) => {
  return {
    AppState: payload,
  };
};

export const setDataView = (_state, payload) => {
  return {
    dataView: payload,
  };
};

function setViewport(_state, payload) {
  return {
    viewport: {
      latitude: payload[1],
      longitude: payload[0],
      zoom: 19,
      maxZoom: 19,
      transitionDuration: 2000,
      transitionEasing: d3EaseCubic,
      transitionInterpolator: new FlyToInterpolator(),
      minZoom: isMobile ? 11 : 9,
      pitch: isMobile ? 0 : 45,
      bearing: 0,
    },
  };
}

function setView(_state, payload) {
  return {
    viewport: payload,
  };
}

export const getWateredTrees = Store => async () => {
  try {
    Store.setState({ isLoading: true });
    const url = createAPIUrl(Store.getState(), '/get?queryType=watered');
    const result = await requests(url);

    if (result.data === undefined) {
      throw new Error('data is not defined on getWateredTrees');
    }
    return {
      wateredTrees: result.data.watered,
    };
  } catch (error) {
    console.error(error);
  }
};

export const getTree = Store => async id => {
  try {
    const url = createAPIUrl(Store.getState(), `/get?queryType=byid&id=${id}`);
    const urlWatered = createAPIUrl(
      Store.getState(),
      `/get?queryType=lastwatered&id=${id}`
    );

    const res = await requests(url);
    const resWatered = await requests(urlWatered);

    if (res.data.length > 0) {
      // ISSUE:141
      res.data[0].radolan_days = res.data[0].radolan_days.map(d => d / 10);
      res.data[0].radolan_sum = res.data[0].radolan_sum / 10;

      return {
        selectedTree: res.data[0],
        treeLastWatered: resWatered,
      };
    } else {
      return {
        selectedTree: undefined,
        treeLastWatered: resWatered,
      };
    }
  } catch (error) {
    console.error(error);
  }
};

export const removeSelectedTree = () => {
  return {
    selectedTree: false,
    selectedTreeState: false,
  };
};

export const getTreeByAge = Store => async (
  state: any,
  start: string,
  end: string
) => {
  try {
    Store.setState({ selectedTreeState: 'LOADING' });
    const url = createAPIUrl(
      state,
      `/get??queryType=byage&start=${start}&end=${end}`
    );

    const res = await requests(url);

    Store.setState({
      selectedTreeState: 'LOADED',
      selectedTrees: res.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const toggleOverlay: (_state: any, payload: any) => { overlay: any } = (
  _state,
  payload
) => ({
  overlay: payload,
});

const setDetailRouteWithListPath = (_state, treeId) => {
  const nextLocation = `/search?location=${treeId}`;
  history.push(nextLocation);
};

export default Store => ({
  loadData: loadData(Store),
  setDataView,
  getWateredTrees: getWateredTrees(Store),
  loadCommunityData: loadCommunityData(Store),
  getTree: getTree(Store),
  getTreeByAge: getTreeByAge(Store),
  setDetailRouteWithListPath,
  setViewport,
  setView,
  // setView,
  loadTrees: loadTrees(Store),
  removeSelectedTree,
  setAppState,
  setAgeRange,
  toggleOverlay,
});
