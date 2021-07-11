import { scaleLinear } from 'd3-scale';
import { interpolateViridis } from 'd3-scale-chromatic';

const colorScale = scaleLinear().domain([0, 300]).range([1, 0.6]);
export const interpolateColor = (val: number): string => {
  return interpolateViridis(colorScale(val));
};

export const hexToRgb = (hex: string): [number, number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
        200,
      ]
    : [0, 0, 0, 0];
};
