import { createGeojson, test } from './utils';
import { dsv as d3Dsv } from 'd3';
import axios from 'axios';
import { createAPIUrl } from './utils';

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
  const data = JSON.stringify({});
  const url = createAPIUrl(Store.getState(), '/api/get-watered-trees')

  axios.post(url, data)
    .then((r) => {
      console.log(r);
    })


  return {
    isLoading: false
  }
}

export default Store => ({
  loadData: loadData(Store),
  getWateredTrees: getWateredTrees(Store),
});