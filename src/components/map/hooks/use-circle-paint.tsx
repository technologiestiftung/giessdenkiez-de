import { Expression } from "mapbox-gl";

export function useCirclePaint() {
  const treeDefaultColor = "#CAE11F";

  const circleRadius = {
    base: 1.75,
    stops: [
      [11, 1],
      [22, 100],
    ],
  };

  const circleOpacity = [
    "interpolate",
    ["linear"],
    ["zoom"],
    0,
    1,
    20,
    0.5,
  ] as Expression;

  const circleStrokeColor = [
    "case",
    ["boolean", ["feature-state", "hover"], false],
    "#1169EE",
    ["boolean", ["feature-state", "select"], false],
    "#1169EE",
    "#000000",
  ] as Expression;

  const circleStrokeWidth = [
    "case",
    ["boolean", ["feature-state", "hover"], false],
    8,
    ["boolean", ["feature-state", "select"], false],
    8,
    0,
  ] as Expression;

  const circleColor = treeDefaultColor;

  return {
    circleRadius,
    circleOpacity,
    circleStrokeColor,
    circleColor,
    circleStrokeWidth,
  };
}
