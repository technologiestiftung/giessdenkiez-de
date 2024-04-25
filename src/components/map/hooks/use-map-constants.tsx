import resolveConfig from "tailwindcss/resolveConfig";
//@ts-expect-error tailwindConfig has no type definition
import tailwindConfig from "../../../../tailwind.config.js";
import { PointLike } from "mapbox-gl";
const fullConfig = resolveConfig(tailwindConfig);

export function useMapConstants() {
	const MAP_PITCH_DEGREES = parseInt(import.meta.env.VITE_MAP_PITCH_DEGREES);
	const MAP_MAX_ZOOM_LEVEL = parseInt(import.meta.env.VITE_MAP_MAX_ZOOM_LEVEL);
	const MAP_LOCATION_ZOOM_LEVEL = parseInt(
		import.meta.env.VITE_MAP_LOCATION_ZOOM_LEVEL,
	);
	const TREE_DEFAULT_COLOR = fullConfig.theme.colors["gdk-neon-green"];
	const TREE_GRAY_COLOR = fullConfig.theme.colors["gdk-tree-gray"];

	const MAP_MIN_ZOOM_LEVEL = parseInt(import.meta.env.VITE_MAP_MIN_ZOOM_LEVEL);
	const MAP_INITIAL_ZOOM_LEVEL = parseInt(
		import.meta.env.VITE_MAP_INITIAL_ZOOM_LEVEL,
	);
	const MAP_CENTER_LNG = parseFloat(import.meta.env.VITE_MAP_CENTER_LNG);
	const MAP_CENTER_LAT = parseFloat(import.meta.env.VITE_MAP_CENTER_LAT);

	const MAP_PUMP_IMAGE_ICONS = [
		{
			url: "/images/pump_functioning_selected.png",
			id: "pump_functioning_selected",
		},
		{
			url: "/images/pump_functioning_unselected.png",
			id: "pump_functioning_unselected",
		},
		{
			url: "/images/pump_not_functioning_selected.png",
			id: "pump_not_functioning_selected",
		},
		{
			url: "/images/pump_not_functioning_unselected.png",
			id: "pump_not_functioning_unselected",
		},
	];

	const MAP_TREE_ZOOMED_IN_OFFSET = [-150, 0] as PointLike;

	return {
		MAP_PITCH_DEGREES,
		MAP_MAX_ZOOM_LEVEL,
		MAP_LOCATION_ZOOM_LEVEL,
		MAP_MIN_ZOOM_LEVEL,
		MAP_INITIAL_ZOOM_LEVEL,
		TREE_DEFAULT_COLOR,
		MAP_CENTER_LNG,
		MAP_CENTER_LAT,
		MAP_PUMP_IMAGE_ICONS,
		TREE_GRAY_COLOR,
		MAP_TREE_ZOOMED_IN_OFFSET,
	};
}
