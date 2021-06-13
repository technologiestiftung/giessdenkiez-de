import { scaleLinear } from 'd3-scale';
import { interpolateRdYlGn } from 'd3-scale-chromatic';

const colorScale = scaleLinear().domain([0, 300]).range([0.2, 1]);
export const interpolateColor = (val: number): string => {
  return interpolateRdYlGn(colorScale(val));
};

export const rgbStrToRgb = (rgbStr: string): [number, number, number, number] => {
  const result = /^rgb\(?(\d{1,3}),\s(\d{1,3}),\s(\d{1,3})\)$/i.exec(rgbStr);
  return result
    ? [
        parseInt(result[1]),
        parseInt(result[2]),
        parseInt(result[3]),
        200,
      ]
    : [0, 0, 0, 0];
};
