import { CirclePaint } from 'mapbox-gl';
import { getTreeCircleColor } from './mapColorUtil';
import { Map as MapboxMap } from 'mapbox-gl';

export const getTreeCircleRadius = ({
  wateredFilterOn = false,
  adoptedFilterOn = false,
}: {
  wateredFilterOn?: boolean;
  adoptedFilterOn?: boolean;
}): CirclePaint['circle-radius'] => {
  if (wateredFilterOn || adoptedFilterOn) {
    return [
      'interpolate',
      ['linear'],
      ['zoom'],
      // When zoom is 10 or lower:
      10,
      4,
      // In between we interpolate between 4 and 24 (in px as radius).
      // When zoom is 22 or higher:
      22,
      24,
    ] as CirclePaint['circle-radius'];
  } else {
    return {
      base: 1.75,
      stops: [
        [11, 1],
        [22, 100],
      ],
    };
  }
};

export const updateTreeCirclePaintProps = ({
  map,
  wateredFilterOn = false,
  adoptedFilterOn = false,
}: {
  map: MapboxMap;
  wateredFilterOn?: boolean;
  adoptedFilterOn?: boolean;
}): void => {
  map.setPaintProperty(
    'trees',
    'circle-radius',
    getTreeCircleRadius({
      wateredFilterOn,
      adoptedFilterOn,
    })
  );
  map.setPaintProperty('trees', 'circle-color', getTreeCircleColor());
};
