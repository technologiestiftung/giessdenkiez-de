import { dsv as d3Dsv, GeoGeometryObjects } from 'd3';
import { ExtendedFeatureCollection, ExtendedFeature } from 'd3-geo';
import { Tree, TreeGeojsonFeatureProperties } from '../../common/interfaces';

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
       * transferring 750.000 "," characters, therefore,
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
  const dataUrl = process.env.AWS_TREES_URL as string;

  const data = await d3Dsv(',', dataUrl, { cache: 'force-cache' });
  const geojson = createGeojson((data as unknown) as Tree[]);
  return geojson;
};
