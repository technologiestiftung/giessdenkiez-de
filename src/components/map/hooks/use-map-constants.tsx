import resolveConfig from "tailwindcss/resolveConfig";
//@ts-ignore
import tailwindConfig from "../../../../tailwind.config.js";
const fullConfig = resolveConfig(tailwindConfig);

export function useMapConstants() {
  const MAP_PITCH_DEGREES = 45;
  const ZOOMED_IN_ZOOM_LEVEL = 20;
  const TREE_DEFAULT_COLOR = fullConfig.theme.colors["gdk-tree-green"];
  return { MAP_PITCH_DEGREES, ZOOMED_IN_ZOOM_LEVEL, TREE_DEFAULT_COLOR };
}
