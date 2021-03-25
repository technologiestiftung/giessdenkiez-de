import { scaleLinear, interpolateViridis } from 'd3';

type RGBAColor = [number, number, number, number];
type RGBColor = [number, number, number];

interface Color {
  name: string;
  hex: string;
  rgba: RGBAColor;
  cmyk: RGBAColor;
  hsb: RGBColor;
  hsl: RGBColor;
  lab: RGBColor;
}

export const brokenColor: Color = {
  name: 'Dark Jungle Green',
  hex: '#141f20',
  rgba: [20, 31, 32, 200],
  cmyk: [38, 3, 0, 87],
  hsb: [185, 38, 13],
  hsl: [185, 23, 10],
  lab: [11, -5, -2],
}; // [105, 116, 124, 200];
export const defaultColor: Color = {
  name: 'Pewter Blue',
  hex: '#7599a9',
  rgba: [117, 153, 169, 200],
  cmyk: [31, 9, 0, 34],
  hsb: [198, 31, 66],
  hsl: [198, 23, 56],
  lab: [61, -8, -12],
}; //[223, 41, 84, 200];
export const workingColor: Color = {
  name: 'Green Pigment',
  hex: '#45a447',
  rgba: [69, 164, 71, 200],
  cmyk: [58, 0, 57, 36],
  hsb: [121, 58, 64],
  hsl: [121, 41, 46],
  lab: [60, -47, 39],
}; // [1132, 221, 99, 200];
export const lockedColor: Color = {
  name: 'Azure X 11 Web Color',
  hex: '#d7eae5',
  rgba: [215, 234, 229, 200],
  cmyk: [8, 0, 2, 8],
  hsb: [164, 8, 92],
  hsl: [164, 31, 88],
  lab: [91, -7, 0],
}; // [203, 225, 77, 200];

export const pumpColors = {
  unbekannt: defaultColor,
  funktionsfähig: workingColor,
  defekt: brokenColor,
  verriegelt: lockedColor,
};

const hexToRGBAColor = (hexString: string): RGBAColor => {
  const hex = hexString.substr(1).match(/.{2}/g);

  return [
    parseInt(hex[0], 16),
    parseInt(hex[1], 16),
    parseInt(hex[2], 16),
    200,
  ];
};

export const getRainColor = (rainAmount: number): RGBAColor => {
  const scale = scaleLinear().domain([0, 300]).range([1, 0.6]);
  const hexString = interpolateViridis(scale(rainAmount));

  return hexToRGBAColor(hexString);
};
