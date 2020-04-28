import axios from 'axios';

export function createGeojson(data) {
  const geojson = {
      "type": "FeatureCollection",
      "features": []
  }

  data.forEach(tree => {
      const feature = {
          "type": "Feature",
          "geometry": {
              "type": "Point",
              "coordinates": [+tree[1], +tree[2]]
          },
          "properties": {
              "id": tree[0],
          }
      }
      geojson.features.push(feature);
  })

  return geojson;
};


export function flatten(ary) {
    var ret = [];
    for(var i = 0; i < ary.length; i++) {
        if(Array.isArray(ary[i])) {
            ret = ret.concat(flatten(ary[i]));
        } else {
            ret.push(ary[i]);
        }
    }
    return ret;
}


export function createAPIUrl(state, entrypoint) {
    return state.local ? `${state.endpoints.local}${entrypoint}` : `${state.endpoints.prod}${entrypoint}`;
}

export async function fetchAPI(url, config = {}) {

    return axios.get(url, config)
        .then((r) => {
            return r
        }).catch(function (error) {
             console.log(error);
        });
}

export default {
  createGeojson,
  createAPIUrl,
  fetchAPI,
  flatten
}