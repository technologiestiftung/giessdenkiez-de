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

export default {
  createGeojson,
  createAPIUrl
}