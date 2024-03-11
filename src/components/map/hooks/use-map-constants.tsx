import resolveConfig from "tailwindcss/resolveConfig";
//@ts-ignore
import tailwindConfig from "../../../../tailwind.config.js";
const fullConfig = resolveConfig(tailwindConfig);

export function useMapConstants() {
  const MAP_PITCH_DEGREES = import.meta.env.VITE_MAP_PITCH_DEGREES;
  const ZOOMED_IN_ZOOM_LEVEL = import.meta.env.VITE_MAP_MAX_ZOOM_LEVEL;
  const TREE_DEFAULT_COLOR = fullConfig.theme.colors["gdk-tree-green"];
  return { MAP_PITCH_DEGREES, ZOOMED_IN_ZOOM_LEVEL, TREE_DEFAULT_COLOR };
}
