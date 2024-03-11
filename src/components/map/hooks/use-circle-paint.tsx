import { Expression } from "mapbox-gl";
import { useMapConstants } from "./use-map-constants";
import resolveConfig from "tailwindcss/resolveConfig";

//@ts-ignore
import tailwindConfig from "../../../../tailwind.config.js";
const fullConfig = resolveConfig(tailwindConfig);

export function useCirclePaint() {
  const { TREE_DEFAULT_COLOR } = useMapConstants();

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
    fullConfig.theme.colors["gdk-blue"],
    ["boolean", ["feature-state", "select"], false],
    fullConfig.theme.colors["gdk-blue"],
    "#000000",
  ] as Expression;

  const circleStrokeWidth = [
    "interpolate",
    ["exponential", 2],
    ["zoom"],
    16,
    [
      "case",
      ["boolean", ["feature-state", "hover"], false],
      2,
      ["boolean", ["feature-state", "select"], false],
      2,
      0,
    ],
    18,
    [
      "case",
      ["boolean", ["feature-state", "hover"], false],
      6,
      ["boolean", ["feature-state", "select"], false],
      6,
      0,
    ],
    20,
    [
      "case",
      ["boolean", ["feature-state", "hover"], false],
      10,
      ["boolean", ["feature-state", "select"], false],
      10,
      0,
    ],
  ] as Expression;

  return {
    circleRadius,
    circleOpacity,
    circleStrokeColor,
    circleColor: TREE_DEFAULT_COLOR,
    circleStrokeWidth,
  };
}
