import { createGeojson, test } from './utils';
import { dsv as d3Dsv } from 'd3';

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
    data: data,
    isLoading: false
  }
}

export const loadTree = (id) => {
  
}

export default Store => ({
  loadData: loadData(Store),
});