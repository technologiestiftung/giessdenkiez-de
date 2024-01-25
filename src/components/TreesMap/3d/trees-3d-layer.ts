import mapboxgl from 'mapbox-gl';

export const trees3DHighlightSourceId = 'trees-3d-highlight-source';
export const trees3DHighlightLayerId = 'trees-3d-highlight-layer';
export const trees3DCylinderSourceId = 'trees-3d-cylinders-source';
export const trees3DCylinderLayerId = 'trees-3d-cylinders-layer';
export const trees3DLayerId = 'trees-3d-layer';

export const trees3DLayer = {
  id: trees3DLayerId,
  //@ts-ignore
  type: 'model',
  source: 'trees',
  'source-layer': process.env.NEXT_PUBLIC_MAPBOX_TREES_TILESET_LAYER,
  layout: {
    //@ts-ignore
    'model-id': 'tree-general-model',
  },
  paint: {
    //@ts-ignore
    'model-scale': [0.008, 0.008, 0.008],
    'model-translation': [0, 0, 0],
    'model-opacity': 1,
  },
};

export const trees3DCylinderSource = {
  type: 'geojson',
  data: 'tree_cylinders.json',
  promoteId: 'id',
};

export const trees3DCylinderLayer = {
  id: trees3DCylinderLayerId,
  type: 'fill-extrusion',
  source: trees3DCylinderSourceId,
  paint: {
    'fill-extrusion-height': 8,
    'fill-extrusion-opacity': 0.1,
    'fill-extrusion-color': '#ff0000',
  },
};

export const trees3DHighlightSource = function (
  lat: number,
  lng: number,
  featureId: string
) {
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
    'model-id': 'tree-highlight-model',
  },
  paint: {
    //@ts-ignore
    'model-scale': [0.011, 0.011, 0.01],
    'model-translation': [0, 0, 0],
    'model-opacity': 1,
    // 'model-color': '#ff0000',
    // 'model-color-mix-intensity': 0.5,
  },
};

export const add3dHighlightLayer = function (
  map: mapboxgl.Map,
  feature: mapboxgl.MapboxGeoJSONFeature
) {
  const treeId = feature.id as string;
  const lat = feature.properties!.lat;
  const lng = feature.properties!.lng;
  if (!map.getSource(trees3DHighlightSourceId)) {
    map.addSource(
      trees3DHighlightSourceId,
      //@ts-ignore
      trees3DHighlightSource(lat, lng, treeId)
    );
    //@ts-ignore
    map.addLayer(trees3DHighlightLayer);
  }
  map.setFeatureState(
    {
      source: trees3DCylinderSourceId,
      id: treeId,
    },
    { hovered: true }
  );
};

export const remove3dHighlightLayer = function (
  map: mapboxgl.Map,
  treeId: string
) {
  map.setFeatureState(
    {
      source: trees3DCylinderSourceId,
      id: treeId,
    },
    { hovered: false }
  );
  if (map.getSource(trees3DHighlightSourceId)) {
    map.removeLayer(trees3DHighlightLayerId);
    map.removeSource(trees3DHighlightSourceId);
  }
};

export const add3dTreesCylinderMouseMoveListener = function (
  map: mapboxgl.Map,
  hoverCallback: (treeId: string) => void
) {
  map.on('mousemove', trees3DCylinderLayerId, function (e) {
    const firstFeature = e.features ? e.features[0] : null;
    if (firstFeature) {
      const treeId = firstFeature.id as string;
      add3dHighlightLayer(map, firstFeature);
      hoverCallback(treeId);
    }
  });
};

export const add3dTreesCylinderMouseLeaveListener = function (
  map: mapboxgl.Map,
  lastHoveredTreeIdRef: React.MutableRefObject<string | undefined>,
  selectedTreeIdRef: React.MutableRefObject<string | undefined>,
  callback: () => void
) {
  map.on('mouseleave', trees3DCylinderLayerId, function () {
    console.log(
      'mouseleave',
      lastHoveredTreeIdRef.current,
      selectedTreeIdRef.current
    );
    if (lastHoveredTreeIdRef.current && !selectedTreeIdRef.current) {
      remove3dHighlightLayer(map, lastHoveredTreeIdRef.current);
    }
    callback();
  });
};

export const add3dTreesCylinderHoverListener = function (map: mapboxgl.Map) {
  map.setPaintProperty(trees3DCylinderLayerId, 'fill-extrusion-color', [
    'case',
    ['boolean', ['feature-state', 'hovered'], false],
    '#00ff00',
    '#0000ff',
  ]);
};
