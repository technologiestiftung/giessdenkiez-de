type RGBAColor = [red: number, green: number, blue: number, alpha: number];
type CMYKColor = [cyan: number, magenta: number, yellow: number, black: number];
type HslColor = [hue: number, saturation: number, lightness: number];
type HsbColor = [hue: number, saturation: number, brightness: number];
type LabColor = [hue: number, saturation: number, brightness: number];

interface Color {
  name: string;
  rgba: RGBAColor;
  hsl: HslColor;
  hsb: HsbColor;
  cmyk: CMYKColor;
  hex: string;
  lab: LabColor;
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

export const pumpToColor: (pumpInfo?: {
  properties?: {
    'pump:status'?: string;
  };
}) => RGBAColor = pumpInfo => {
  if (pumpInfo?.properties && pumpInfo.properties['pump:status']) {
    const status = pumpInfo.properties['pump:status'];
    switch (status) {
      case 'unbekannt': {
        return defaultColor.rgba;
      }
      case 'defekt': {
        return brokenColor.rgba;
      }
      case 'funktionsfähig': {
        return workingColor.rgba;
      }
      case 'verriegelt': {
        return lockedColor.rgba;
      }

      default: {
        return defaultColor.rgba;
      }
    }
  }
  return defaultColor.rgba;
};
