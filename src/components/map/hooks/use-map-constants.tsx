import resolveConfig from "tailwindcss/resolveConfig";
//@ts-ignore
import tailwindConfig from "../../../../tailwind.config.js";
const fullConfig = resolveConfig(tailwindConfig);

export function useMapConstants() {
	const MAP_PITCH_DEGREES = parseInt(import.meta.env.VITE_MAP_PITCH_DEGREES);
	const MAP_MAX_ZOOM_LEVEL = parseInt(import.meta.env.VITE_MAP_MAX_ZOOM_LEVEL);
	const MAP_LOCATION_ZOOM_LEVEL = parseInt(
		import.meta.env.VITE_MAP_LOCATION_ZOOM_LEVEL,
	);
	const TREE_DEFAULT_COLOR = fullConfig.theme.colors["gdk-tree-green"];
	const MAP_MIN_ZOOM_LEVEL = parseInt(import.meta.env.VITE_MAP_MIN_ZOOM_LEVEL);
	const MAP_INITIAL_ZOOM_LEVEL = parseInt(
		import.meta.env.VITE_MAP_INITIAL_ZOOM_LEVEL,
	);
	const MAP_CENTER_LNG = parseFloat(import.meta.env.VITE_MAP_CENTER_LNG);
	const MAP_CENTER_LAT = parseFloat(import.meta.env.VITE_MAP_CENTER_LAT);

	return {
		MAP_PITCH_DEGREES,
		MAP_MAX_ZOOM_LEVEL,
		MAP_LOCATION_ZOOM_LEVEL,
		MAP_MIN_ZOOM_LEVEL,
		MAP_INITIAL_ZOOM_LEVEL,
		TREE_DEFAULT_COLOR,
		MAP_CENTER_LNG,
		MAP_CENTER_LAT,
	};
}
