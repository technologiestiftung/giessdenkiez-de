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

	const TREE_GRAY_COLOR = fullConfig.theme.colors["gdk-light-gray"];
	const TREE_YELLOW_COLOR = fullConfig.theme.colors["gdk-tree-yellow"];
	const TREE_ORANGE_COLOR = fullConfig.theme.colors["gdk-tree-orange"];

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

	// Our main breakpoint is 1024px, on desktop-like screens we want to offset the tree popup to the left
	// because the tree popup is displayed on the right side of the screen. On mobile-like screens we don't
	// want to offset the tree popup, because the tree popup is displayed full screen.
	const mapTreeZoomedInOffset = (windowWidth: number): PointLike => {
		return windowWidth >= 1024
			? ([-150, 0] as PointLike)
			: ([0, 0] as PointLike);
	};

	// The link is stored in source code instead of environment variable, because of the required string interpolation of lat/lng/id which would be too complicated to handle in environment variables
	const pumpUpdateLink = (id: number, lat: number, lng: number) => {
		return `https://mapcomplete.org/theme.html?z=15.1&lat=${lat}&lon=${lng}&userlayout=https%3A%2F%2Fstudio.mapcomplete.org%2F11881%2Fthemes%2Fberlin_emergency_water_pumps%2Fberlin_emergency_water_pumps.json#node/${id}`;
	};

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
		TREE_YELLOW_COLOR,
		TREE_ORANGE_COLOR,
		mapTreeZoomedInOffset,
		pumpUpdateLink,
	};
}
