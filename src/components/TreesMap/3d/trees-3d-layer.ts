import mapboxgl from 'mapbox-gl';

export const trees3DHighlightSourceId = 'trees-3d-highlight-source';
export const trees3DHighlightLayerId = 'trees-3d-highlight-layer';
export const trees3DCylinderSourceId = 'trees-3d-cylinders-source';
export const trees3DCylinderLayerId = 'trees-3d-cylinders-layer';
export const trees3DLayerId = 'trees-3d-layer';
export const treeModelId = 'tree-general-model';

const MAPBOX_TREE_CYLINDERS_TILESET_URL =
  process.env.NEXT_PUBLIC_MAPBOX_TREE_CYLINDERS_TILESET_URL;
const MAPBOX_TREE_CYLINDERS_LAYERNAME =
  process.env.NEXT_PUBLIC_MAPBOX_TREE_CYLINDERS_LAYERNAME;

interface Position {
  lat: number;
  lng: number;
}

function offset(
  lat: number,
  lon: number,
  toEastInMeters: number,
  toSouthInMeters: number
): Position {
  const AVERAGE_RADIUS_OF_EARTH_M = 6371000;
  const dLat = -1.0 * (toSouthInMeters / AVERAGE_RADIUS_OF_EARTH_M);
  const dLon =
    toEastInMeters /
    (AVERAGE_RADIUS_OF_EARTH_M * Math.cos((Math.PI * lat) / 180));
  const newLat = lat + (dLat * 180) / Math.PI;
  const newLon = lon + (dLon * 180) / Math.PI;
  return { lat: newLat, lng: newLon };
}

export const trees3DLayer = {
  id: trees3DLayerId,
  //@ts-ignore
  type: 'model',
  source: 'trees',
  'source-layer': 'trees',
  layout: {
    //@ts-ignore
    'model-id': treeModelId,
  },
  paint: {
    //@ts-ignore
    'model-scale': [0.008, 0.008, 0.008],
    'model-translation': [0, 0, 0],
    'model-opacity': 1,
  },
};

export const trees3DCylinderSource = {
  id: trees3DCylinderSourceId,
  type: 'geojson',
  data: {
    type: 'FeatureCollection',
    features: [],
  },
  minzoom: 0,
  maxzoom: 20,
  promoteId: 'id',
};

export const trees3DCylinderLayer = {
  id: trees3DCylinderLayerId,
  type: 'fill-extrusion',
  source: trees3DCylinderSourceId,
  // 'source-layer': MAPBOX_TREE_CYLINDERS_LAYERNAME,
  paint: {
    'fill-extrusion-height': 10,
    'fill-extrusion-opacity': 0.5,
    'fill-extrusion-color': '#ff0000',
  },
};

export const trees3DHighlightSource = (
  lat: number,
  lng: number,
  featureId: string
) => {
  return {
    type: 'geojson',
    data: {
      features: [
        {
          type: 'Feature',
          properties: { id: featureId },
          geometry: {
            type: 'Point',
            coordinates: [lng, lat],
          },
          id: featureId,
        },
      ],
      type: 'FeatureCollection',
    },
    promoteId: 'id',
  };
};

export const trees3DHighlightLayer = {
  id: trees3DHighlightLayerId,
  //@ts-ignore
  type: 'model',
  source: trees3DHighlightSourceId,
  layout: {
    //@ts-ignore
    'model-id': treeModelId,
  },
  paint: {
    //@ts-ignore
    'model-scale': [0.01, 0.01, 0.008],
    'model-translation': [0, 0, 0.05],
    'model-opacity': 1,
  },
};

export const add3dHighlightLayer = (
  map: mapboxgl.Map,
  feature: mapboxgl.MapboxGeoJSONFeature
) => {
  const treeId = feature.id as string;
  const featureTree = map.queryRenderedFeatures(undefined, {
    layers: ['trees'],
    filter: ['==', 'id', treeId],
  })[0];

  if (!featureTree) return;

  //@ts-ignore
  const lat = featureTree.geometry.coordinates[1];
  //@ts-ignore
  const lng = featureTree.geometry.coordinates[0];

  if (!map.getSource(trees3DHighlightSourceId)) {
    map.addSource(
      trees3DHighlightSourceId,
      //@ts-ignore
      trees3DHighlightSource(lat, lng, treeId)
    );
    //@ts-ignore
    map.addLayer(trees3DHighlightLayer);
    map.moveLayer(trees3DHighlightLayerId, trees3DLayerId);
  }

  map.setFeatureState(
    {
      source: trees3DCylinderSourceId,
      // sourceLayer: 'tree_cylinders',
      id: treeId,
    },
    { hovered: true }
  );
};

export const remove3dHighlightLayer = (map: mapboxgl.Map, treeId: string) => {
  map.setFeatureState(
    {
      source: trees3DCylinderSourceId,
      // sourceLayer: 'tree_cylinders',
      id: treeId,
    },
    { hovered: false }
  );
  if (map.getSource(trees3DHighlightSourceId)) {
    map.removeLayer(trees3DHighlightLayerId);
    map.removeSource(trees3DHighlightSourceId);
  }
};

export const add3dTreesCylinderMouseMoveListener = (
  map: mapboxgl.Map,
  lastHoveredTreeIdRef: React.MutableRefObject<string | undefined>,
  hoverCallback: (treeId: string) => void
) => {
  map.on('mousemove', trees3DCylinderLayerId, function (e) {
    const firstFeature = e.features ? e.features[0] : null;
    if (firstFeature) {
      const treeId = firstFeature.id as string;
      if (
        lastHoveredTreeIdRef.current &&
        lastHoveredTreeIdRef.current !== treeId
      ) {
        remove3dHighlightLayer(map, lastHoveredTreeIdRef.current);
      }
      add3dHighlightLayer(map, firstFeature);
      hoverCallback(treeId);
    }
  });
};

export const add3dTreesCylinderMouseLeaveListener = (
  map: mapboxgl.Map,
  lastHoveredTreeIdRef: React.MutableRefObject<string | undefined>,
  selectedTreeCylinderIdRef: React.MutableRefObject<string | undefined>,
  callback: () => void
) => {
  map.on('mouseleave', trees3DCylinderLayerId, function () {
    if (lastHoveredTreeIdRef.current && !selectedTreeCylinderIdRef.current) {
      remove3dHighlightLayer(map, lastHoveredTreeIdRef.current);
      callback();
    }
  });
};

export const addTreeCylindersDynamicallyOnMouseMove = (
  map: mapboxgl.Map,
  x: number,
  y: number
) => {
  const boxSize = 80;

  // Calculate the bounding box in pixel coordinates
  var bbox = [
    [x - boxSize, y - boxSize],
    [x + boxSize, y + boxSize],
  ];

  // Use queryRenderedFeatures to get features within the bounding box
  var features = map.queryRenderedFeatures(bbox, {
    layers: ['trees'], // Specify the layer(s) you want to query
  });

  const geojson = {
    type: 'FeatureCollection',
    features: features.map(f => {
      const offsetMeters = 3.7;

      const lat = f.geometry.coordinates[1];
      const lng = f.geometry.coordinates[0];

      const topLeft = offset(lat, lng, offsetMeters, -offsetMeters);
      const topRight = offset(lat, lng, -offsetMeters, -offsetMeters);
      const bottomLeft = offset(lat, lng, offsetMeters, offsetMeters);
      const bottomRight = offset(lat, lng, -offsetMeters, offsetMeters);

      return {
        type: 'Feature',
        properties: { id: f.id, lat: lat, lng: lng },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [topLeft.lng, topLeft.lat],
              [topRight.lng, topRight.lat],
              [bottomRight.lng, bottomRight.lat],
              [bottomLeft.lng, bottomLeft.lat],
              [topLeft.lng, topLeft.lat],
            ],
          ],
        },
        id: f.id,
      };
    }),
  };

  map.getSource(trees3DCylinderSourceId).setData(geojson);
};
