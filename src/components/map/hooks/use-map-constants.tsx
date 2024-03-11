import resolveConfig from "tailwindcss/resolveConfig";
//@ts-ignore
import tailwindConfig from "../../../../tailwind.config.js";
const fullConfig = resolveConfig(tailwindConfig);

export function useMapConstants() {
  const MAP_PITCH_DEGREES = parseInt(import.meta.env.VITE_MAP_PITCH_DEGREES);
  const MAX_ZOOM_LEVEL = parseInt(import.meta.env.VITE_MAP_MAX_ZOOM_LEVEL);
  const TREE_DEFAULT_COLOR = fullConfig.theme.colors["gdk-tree-green"];
  return { MAP_PITCH_DEGREES, MAX_ZOOM_LEVEL, TREE_DEFAULT_COLOR };
}
