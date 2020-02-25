import { createGeojson, test } from './utils';
import { dsv as d3Dsv } from 'd3';
import axios from 'axios';
import history from '../../history';
import { createAPIUrl, fetchAPI } from './utils';
import { FlyToInterpolator } from 'react-map-gl';

import { 
    easeCubic as d3EaseCubic
} from 'd3';


export const loadData = Store => async () => {
  Store.setState({ isLoading: true });
  let geojson = [];

  const trees = require("../../data/trees.csv");
  const data = d3Dsv(",", trees, function(d) {
    return {
        id: d.id,
        lat: d.lat,
        lng: d.lng
    };
  }).then( (data) => {
    return createGeojson(data);
  });

  return {
    data: data
  }
}

export const setAppState = (state, payload) => {
  return {
    AppState: payload
  }
}

function setViewport(state, payload) {
  return {
    viewport: {
			latitude: payload[1],
			longitude: payload[0],
			zoom: 16,
			maxZoom: 19,
			transitionDuration: 1000,
			transitionEasing: d3EaseCubic,
			transitionInterpolator: new FlyToInterpolator(),
			minZoom: 9,
			pitch: 45,
			bearing: 0
		}
  }
}

function setView(state, payload) {

  const viewPrevious = {
    maxZoom: 19,
    transitionDuration: 250,
    transitionEasing: d3EaseCubic,
    transitionInterpolator: new FlyToInterpolator(),
    minZoom: 9,
    pitch: 45,
    bearing: 0
  }

  const newViewport = { ...viewPrevious, ...payload }
  return {
    viewport: newViewport
  }
}

function checkStatus(response) {
  if (response.ok) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
  }
}

export const getWateredTrees = Store => async () => {
  Store.setState({ isLoading: true });
  const url = createAPIUrl(Store.getState(), '/get-watered-trees')
  const res = await fetchAPI(url);

  return {
    isLoading: false,
    wateredTrees: res.data.watered
  }
}

export const getTree = Store => async (id) => {
  const url = createAPIUrl(Store.getState(), `/get-tree?id=${id}`);
  const res = await fetchAPI(url);
  return {
    selectedTree: res
  }
}

export const removeSelectedTree = (state, payload) => {
  return {
    selectedTree: false
  }
}

export const getTreeByAge = Store => async (state, start, end) => {
  Store.setState({ selectedTreeState: 'LOADING' });
  const url = createAPIUrl(state, `/get-tree-by-age?start=${start}&end=${end}`);

  const res = await fetchAPI(url)
    .then(r => {
      console.log(r);
      Store.setState({
        selectedTreeState: 'LOADED',
        selectedTrees: r.data
      });
    })
}

const setDetailRouteWithListPath = (state, treeId) => {
  const nextLocation = `/search?location=${treeId}`;
  history.push(nextLocation);
};

export default Store => ({
  loadData: loadData(Store),
  getWateredTrees: getWateredTrees(Store),
  getTree: getTree(Store),
  getTreeByAge: getTreeByAge(Store),
  setDetailRouteWithListPath,
  setViewport,
  setView,
  removeSelectedTree,
  setAppState
});