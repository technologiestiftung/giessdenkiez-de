import { Expression } from "mapbox-gl";
import { useMapConstants } from "./use-map-constants.js";
import resolveConfig from "tailwindcss/resolveConfig";

//@ts-ignore
import tailwindConfig from "../../../../tailwind.config.js";
import {
	TreeAgeInterval,
	TreeAgeIntervalIdentifier,
} from "../../filter/filter-store.js";
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

	const filteredCircleColor = (treeAgeIntervals: TreeAgeInterval[]) => {
		const youngEnabled = treeAgeIntervals.filter(
			(interval) => interval.identifier === TreeAgeIntervalIdentifier.Young,
		)[0].enabled;

		const mediumEnabled = treeAgeIntervals.filter(
			(interval) => interval.identifier === TreeAgeIntervalIdentifier.Medium,
		)[0].enabled;

		const oldEnabled = treeAgeIntervals.filter(
			(interval) => interval.identifier === TreeAgeIntervalIdentifier.Old,
		)[0].enabled;

		return [
			"case",
			["==", ["get", "age"], ""],
			TREE_GRAY_COLOR, // Color for undefined age
			[">", ["get", "age"], 40],
			oldEnabled ? TREE_DEFAULT_COLOR : TREE_GRAY_COLOR, // Color for age > 40
			[">", ["get", "age"], 3],
			mediumEnabled ? TREE_DEFAULT_COLOR : TREE_GRAY_COLOR, // Color for age > 3 and <= 40
			[">", ["get", "age"], 0],
			youngEnabled ? TREE_DEFAULT_COLOR : TREE_GRAY_COLOR, // Color for age > 0 and <= 3
			TREE_GRAY_COLOR, // Fallback color
		];
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
