import { dsv as d3Dsv, GeoGeometryObjects } from 'd3';
import { ExtendedFeatureCollection, ExtendedFeature } from 'd3-geo';
import { Tree, TreeGeojsonFeatureProperties } from '../../common/interfaces';

var isLocalTesting = process.env.LOCAL_TESTING

function createGeojson(trees: Tree[]): ExtendedFeatureCollection {
  const geojson: ExtendedFeatureCollection = {
    type: 'FeatureCollection',
    features: [],
  };

  trees.forEach(tree => {
    const feature: ExtendedFeature<
      GeoGeometryObjects | null,
      TreeGeojsonFeatureProperties
    > = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [
          parseFloat(tree?.lng || '0'),
          parseFloat(tree?.lat || '0'),
        ],
      },
      /**
       * Apparently DWD 1 is not 1ml but 0.1ml
       * We could change this in the database, but this would mean,
       * transferring 625.000 "," characters, therefore,
       * changing it client-side makes more sense.
       */
      properties: {
        id: tree.id,
        radolan_sum: (tree?.radolan_sum || 0) / 10,
        age: tree?.age ? parseInt(tree.age) : undefined,
      },
    };
    geojson.features.push(feature);
  });

  return geojson;
}

export const loadTreesGeoJson = async (): Promise<ExtendedFeatureCollection> => {
  if (isLocalTesting) {
    // http://localhost:8080/search?location=id-54243
    const data = [{
      'id': 'id-54243',
      'lng': 12.465195780349760,
      'lat': 51.436408951092531,
      'radolan_sum': 457,
      'age': 25
    }]
    const geojson = createGeojson((data as unknown) as Tree[]);
    return geojson;  
  } else {
    const dataUrl = process.env.TREE_DATA_URL || 'https://trees-radolan-harvester-leipzig-dev.s3.eu-central-1.amazonaws.com/trees.csv.gz';
    const data = await d3Dsv(',', dataUrl, { cache: 'force-cache' });
    const geojson = createGeojson((data as unknown) as Tree[]);
    return geojson;  
  }
};
