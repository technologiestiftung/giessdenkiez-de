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

export default {
  createGeojson
}