import { Map as MapboxMap } from 'mapbox-gl';

type SelectedTreeIdType = string | undefined;

export const updateSelectedTreeIdFeatureState = ({
  map,
  prevSelectedTreeId,
  currentSelectedTreeId,
}: {
  map: MapboxMap;
  prevSelectedTreeId: SelectedTreeIdType;
  currentSelectedTreeId: SelectedTreeIdType;
}): void => {
  if (prevSelectedTreeId) {
    map.setFeatureState(
      {
        sourceLayer: process.env.MAPBOX_TREES_TILESET_LAYER,
        source: 'trees',
        id: prevSelectedTreeId,
      },
      { select: false }
    );
  }
  if (currentSelectedTreeId) {
    map.setFeatureState(
      {
        sourceLayer: process.env.MAPBOX_TREES_TILESET_LAYER,
        source: 'trees',
        id: currentSelectedTreeId,
      },
      { select: true }
    );
  }
};

export const updateHoverFeatureState = ({
  map,
  prevHoveredTreeId,
  currentHoveredTreeId,
}: {
  map: MapboxMap;
  prevHoveredTreeId: string | null;
  currentHoveredTreeId: string | null;
}): void => {
  if (prevHoveredTreeId) {
    map.setFeatureState(
      {
        sourceLayer: process.env.MAPBOX_TREES_TILESET_LAYER,
        source: 'trees',
        id: prevHoveredTreeId,
      },
      { hover: false }
    );
  }
  if (currentHoveredTreeId) {
    map.setFeatureState(
      {
        sourceLayer: process.env.MAPBOX_TREES_TILESET_LAYER,
        source: 'trees',
        id: currentHoveredTreeId,
      },
      { hover: true }
    );
  }
};
