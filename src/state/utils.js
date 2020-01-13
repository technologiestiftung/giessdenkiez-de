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
              "coordinates": [+tree.lat, +tree.lng]
          },
          "properties": {
              "id": tree.id,
          }
      }
      geojson.features.push(feature);
  })

  return geojson;
};



export function createAPIUrl(state, entrypoint) {
    return state.local ? `${state.endpoints.local}${entrypoint}` : `${state.endpoints.prod}${entrypoint}`;
}

export async function fetchAPI(url) {
    const data = JSON.stringify({});

    return axios.post(url, data)
        .then((r) => {
            return r
        }).catch(function (error) {
             console.log(error);
        });
}

export default {
  createGeojson,
  createAPIUrl,
  fetchAPI
}