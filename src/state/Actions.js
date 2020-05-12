import { dsv as d3Dsv, easeCubic as d3EaseCubic } from 'd3';
import history from '../history';
import { createAPIUrl, fetchAPI, createGeojson } from '../utils';
import { FlyToInterpolator } from 'react-map-gl';

export const loadTrees = Store => async () => {
  // const dataUrlLocal = '../../public/data/trees.csv.gz';
  const dataUrl =
    'https://tsb-trees.s3.eu-central-1.amazonaws.com/trees.csv.gz';

  d3Dsv(',', dataUrl)
    .then(data => {
      const geojson = createGeojson(data);
      Store.setState({ data: geojson, isLoading: false });
      return;
    })
    .catch(console.error);
};

export const setAgeRange = (_state, payload) => {
  return {
    ageRange: payload,
  };
};

export const loadCommunityData = Store => async () => {
  const fetchCommunityDataUrl = createAPIUrl(
    Store.getState(),
    `/get-watered-and-adopted`
  );
  const communityData = await fetchAPI(fetchCommunityDataUrl);

  let obj = {};

  // TODO: Review https://eslint.org/docs/rules/array-callback-return
  // create community data object for map
  communityData.data.map(item => {
    obj[item[0]] = {
      adopted: item[1] === 1 ? true : false,
      watered: item[2] === 1 ? true : false,
    };
  });

  Store.setState({ communityData: Object.assign({}, obj) });
};

export const loadData = Store => async () => {
  Store.setState({ isLoading: true });
  // let geojson = [];

  const dataUrl =
    'https://tsb-trees.s3.eu-central-1.amazonaws.com/weather_light.geojson.gz';

  fetch(dataUrl)
    .then(res => res.json())
    .then(r => Store.setState({ rainGeojson: r }))
    .catch(console.error);

  // const pumps_data = require('../../data/pumps.geojson');
  fetch('/data/pumps.geojson')
    .then(r => r.json())
    .then(r => Store.setState({ pumps: r }))
    .catch(console.error);
};

export const setAppState = (state, payload) => {
  return {
    AppState: payload,
  };
};

export const setDataView = (state, payload) => {
  return {
    dataView: payload,
  };
};

function setViewport(state, payload) {
  return {
    viewport: {
      latitude: payload[1],
      longitude: payload[0],
      zoom: 19,
      maxZoom: 19,
      transitionDuration: 2000,
      transitionEasing: d3EaseCubic,
      transitionInterpolator: new FlyToInterpolator(),
      minZoom: 9,
      pitch: 45,
      bearing: 0,
    },
  };
}

function setView(_state, payload) {
  // const viewPrevious = {
  //   maxZoom: 19,
  //   transitionDuration: 250,
  //   transitionEasing: d3EaseCubic,
  //   transitionInterpolator: new FlyToInterpolator(),
  //   minZoom: 9,
  //   pitch: 45,
  //   bearing: 0,
  // };

  // const newViewport = { ...viewPrevious, ...payload };
  return {
    viewport: payload,
  };
}

// function checkStatus(response) {
//   if (response.ok) {
//     return response;
//   } else {
//     var error = new Error(response.statusText);
//     error.response = response;
//     return Promise.reject(error);
//   }
// }

export const getWateredTrees = Store => async () => {
  Store.setState({ isLoading: true });
  const url = createAPIUrl(Store.getState(), '/get-watered-trees');
  const res = await fetchAPI(url);

  return {
    wateredTrees: res.data.watered,
  };
};

export const getTree = Store => async id => {
  const url = createAPIUrl(Store.getState(), `/get-tree?id=${id}`);
  const urlWatered = createAPIUrl(
    Store.getState(),
    `/get-tree-last-watered?id=${id}`
  );

  const res = await fetchAPI(url);
  const resWatered = await fetchAPI(urlWatered);

  return {
    selectedTree: res,
    treeLastWatered: resWatered,
  };
};

export const removeSelectedTree = (state, payload) => {
  return {
    selectedTree: false,
    selectedTreeState: false,
  };
};

export const getTreeByAge = Store => async (state, start, end) => {
  Store.setState({ selectedTreeState: 'LOADING' });
  const url = createAPIUrl(state, `/get-tree-by-age?start=${start}&end=${end}`);

  await fetchAPI(url)
    .then(r => {
      Store.setState({
        selectedTreeState: 'LOADED',
        selectedTrees: r.data,
      });
      return;
    })
    .catch(console.error);
};

export const toggleOverlay = (state, payload) => ({
  overlay: payload,
});

const setDetailRouteWithListPath = (state, treeId) => {
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
  loadTrees: loadTrees(Store),
  removeSelectedTree,
  setAppState,
  setAgeRange,
  toggleOverlay,
});
