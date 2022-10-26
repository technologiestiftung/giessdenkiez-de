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
  const wasUnselectedAndNowSelected =
    !prevSelectedTreeId && currentSelectedTreeId;
  const wasSelectedAndNowUnselected =
    prevSelectedTreeId && !currentSelectedTreeId;
  const selectedTreeHasChanged =
    prevSelectedTreeId &&
    currentSelectedTreeId &&
    prevSelectedTreeId !== currentSelectedTreeId;

  const selectedTreeStateHasChanged =
    wasUnselectedAndNowSelected ||
    wasSelectedAndNowUnselected ||
    selectedTreeHasChanged;

  const changedTreeId = currentSelectedTreeId || prevSelectedTreeId;

  if (!selectedTreeStateHasChanged) return;

  if (selectedTreeHasChanged) {
    map.setFeatureState(
      {
        sourceLayer: process.env.MAPBOX_TREES_TILESET_LAYER,
        source: 'trees',
        id: prevSelectedTreeId,
      },
      { select: false }
    );
  }

  map.setFeatureState(
    {
      sourceLayer: process.env.MAPBOX_TREES_TILESET_LAYER,
      source: 'trees',
      id: changedTreeId,
    },
    { select: !!currentSelectedTreeId }
  );
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
  const hoveredId = currentHoveredTreeId || prevHoveredTreeId;
  if (!hoveredId) return;
  map.setFeatureState(
    {
      sourceLayer: process.env.MAPBOX_TREES_TILESET_LAYER,
      source: 'trees',
      id: hoveredId,
    },
    { hover: !!currentHoveredTreeId }
  );
};
