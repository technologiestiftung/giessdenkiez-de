import { createGeojson, test } from './utils';
import { dsv as d3Dsv } from 'd3';
import axios from 'axios';
import history from '../../history';
import { createAPIUrl, fetchAPI } from './utils';

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

  console.log(res.data)

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

const setDetailRouteWithListPath = (state, treeId) => {
  const nextLocation = `/selected?location=${treeId}`;
  history.push(nextLocation);
};

export default Store => ({
  loadData: loadData(Store),
  getWateredTrees: getWateredTrees(Store),
  getTree: getTree(Store),
  setDetailRouteWithListPath
});