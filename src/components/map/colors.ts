import { Generic } from '../../common/interfaces';

/*
https://coolors.co/df2954-69747c-84dd63-edff4d
df2954,69747c,84dd63,edff4d


["df2954","69747c","84dd63","edff4d"]


{"Amaranth":"df2954","Sonic Silver":"69747c","Light Green":"84dd63","Chartreuse Traditional":"edff4d"}

[{"name":"Amaranth","hex":"df2954","rgb":[223,41,84],"cmyk":[0,82,62,13],"hsb":[346,82,87],"hsl":[346,74,52],"lab":[49,69,22]},{"name":"Sonic Silver","hex":"69747c","rgb":[105,116,124],"cmyk":[15,6,0,51],"hsb":[205,15,49],"hsl":[205,8,45],"lab":[48,-2,-6]},{"name":"Light Green","hex":"84dd63","rgb":[132,221,99],"cmyk":[40,0,55,13],"hsb":[104,55,87],"hsl":[104,64,63],"lab":[80,-49,51]},{"name":"Chartreuse Traditional","hex":"edff4d","rgb":[237,255,77],"cmyk":[7,0,70,0],"hsb":[66,70,100],"hsl":[66,100,65],"lab":[96,-27,78]}]
*/
export type RGBAColor = [number, number, number, number];
interface Color extends Generic {
  name: string;
  rgba: RGBAColor;
  hex: string;
}
export const brokenColor: Color = {
  name: 'Amaranth',
  hex: '#df2954',
  rgba: [223, 41, 84, 200],
  cmyk: [0, 82, 62, 13],
  hsb: [346, 82, 87],
  hsl: [346, 74, 52],
  lab: [49, 69, 22],
}; // [105, 116, 124, 200];
export const defaultColor: Color = {
  name: 'Sonic Silver',
  hex: '#69747c',
  rgba: [105, 116, 124, 200],
  cmyk: [15, 6, 0, 51],
  hsb: [205, 15, 49],
  hsl: [205, 8, 45],
  lab: [48, -2, -6],
}; //[223, 41, 84, 200];
export const workingColor: Color = {
  name: 'Light Green',
  hex: '#84dd63',
  rgba: [132, 221, 99, 200],
  cmyk: [40, 0, 55, 13],
  hsb: [104, 55, 87],
  hsl: [104, 64, 63],
  lab: [80, -49, 51],
}; // [1132, 221, 99, 200];
export const lockedColor: Color = {
  name: 'Chartreuse Traditional',
  hex: '#edff4d',
  rgba: [237, 255, 77, 200],
  cmyk: [7, 0, 70, 0],
  hsb: [66, 70, 100],
  hsl: [66, 100, 65],
  lab: [96, -27, 78],
}; // [203, 225, 77, 200];
