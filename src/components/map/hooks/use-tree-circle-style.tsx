import { Expression } from "mapbox-gl";
import { useMapConstants } from "./use-map-constants.js";
import resolveConfig from "tailwindcss/resolveConfig";

//@ts-expect-error tailwindConfig has no type definition
import tailwindConfig from "../../../../tailwind.config.js";
import { TreeAgeRange } from "../../filter/filter-store.js";
const fullConfig = resolveConfig(tailwindConfig);

export function useTreeCircleStyle() {
	const { TREE_DEFAULT_COLOR, TREE_GRAY_COLOR } = useMapConstants();

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
		10,
		0.5,
		20,
		0.7,
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

	const filteredCircleColor = (
		isSomeFilterActive: boolean,
		treeAgeRange: TreeAgeRange,
	) => {
		const treeAgeRangeMax =
			treeAgeRange.max === 200 ? Infinity : treeAgeRange.max;

		if (isSomeFilterActive) {
			return [
				"case",
				["==", ["get", "age"], ""],
				TREE_GRAY_COLOR, // Color for undefined age
				[">", ["get", "age"], treeAgeRangeMax],
				TREE_GRAY_COLOR, // Color for age > treeAgeRange.max
				["<=", ["get", "age"], treeAgeRange.min],
				TREE_GRAY_COLOR, // Color for age <= treeAgeRange.min
				TREE_DEFAULT_COLOR, // Fallback color
			];
		}
		return TREE_DEFAULT_COLOR;
	};

	return {
		circleRadius,
		circleOpacity,
		circleStrokeColor,
		circleColor: TREE_DEFAULT_COLOR,
		circleStrokeWidth,
		filteredCircleColor,
	};
}
