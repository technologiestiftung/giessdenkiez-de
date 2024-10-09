/* eslint-disable max-lines */
import { Expression } from "mapbox-gl";
import { useMapConstants } from "./use-map-constants.js";
import resolveConfig from "tailwindcss/resolveConfig";

//@ts-expect-error tailwindConfig has no type definition
import tailwindConfig from "../../../../tailwind.config.js";
import { TreeAgeRange } from "../../filter/filter-store";
const fullConfig = resolveConfig(tailwindConfig);

export function useTreeCircleStyle() {
	const {
		TREE_DEFAULT_COLOR,
		TREE_GRAY_COLOR,
		TREE_ORANGE_COLOR,
		TREE_YELLOW_COLOR,
	} = useMapConstants();

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
		0.7,
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

	const filteredCircleColor = ({
		isSomeFilterActive,
		areOnlyMyAdoptedTreesVisible,
		areLastWateredTreesVisible,
		treeAgeRange,
		adoptedTrees,
		todaysWaterings,
	}: {
		isSomeFilterActive: boolean;
		areOnlyMyAdoptedTreesVisible: boolean;
		areLastWateredTreesVisible: boolean;
		treeAgeRange: TreeAgeRange;
		adoptedTrees: string[];
		todaysWaterings: { [key: string]: number };
	}): Expression => {
		const defaultExpression: Expression = [
			"case",

			// Define logic for "special" districts, those are always rendered in default color
			[
				"in",
				["get", "district"],
				["literal", ["Mitte", "Pankow", "Neukölln", "Lichtenberg"]],
			],
			TREE_DEFAULT_COLOR,

			// Define logic for "normal" districts
			[
				"case",

				// Fall back to default color for trees with undefined age
				["==", ["get", "age"], ""],
				TREE_DEFAULT_COLOR,

				// Senior trees
				[">", ["get", "age"], 10],
				TREE_DEFAULT_COLOR,

				// Junior trees
				[">=", ["get", "age"], 5],
				[
					"case",
					[
						">=",
						[
							"+",
							["round", ["get", "total_water_sum_liters"]],
							["coalesce", ["feature-state", "todays_waterings"], 0],
						],
						200,
					],
					TREE_DEFAULT_COLOR,
					[
						">=",
						[
							"+",
							["round", ["get", "total_water_sum_liters"]],
							["coalesce", ["feature-state", "todays_waterings"], 0],
						],
						100,
					],
					TREE_YELLOW_COLOR,
					TREE_ORANGE_COLOR,
				],

				// Baby trees
				[">=", ["get", "age"], 0],
				TREE_DEFAULT_COLOR,

				// Fallback
				TREE_GRAY_COLOR,
			],
		];

		if (!isSomeFilterActive) {
			return defaultExpression;
		}

		const treeAgeRangeMax =
			treeAgeRange.max === 200 ? Infinity : treeAgeRange.max;

		const isTreeInAgeRangeExpression: Expression = [
			"case",
			["==", ["get", "age"], ""],
			TREE_GRAY_COLOR, // Color for undefined tree age
			[">", ["get", "age"], treeAgeRangeMax],
			TREE_GRAY_COLOR, // Color for tree age > treeAgeRange.max
			["<", ["get", "age"], treeAgeRange.min],
			TREE_GRAY_COLOR, // Color for tree age < treeAgeRange.min
			defaultExpression, // Color for tree age in range
		];

		if (!areOnlyMyAdoptedTreesVisible && !areLastWateredTreesVisible) {
			return isTreeInAgeRangeExpression;
		}

		const isTreeAdoptedAndInAgeRangeExpression: Expression = [
			"case",
			["in", ["get", "id"], ["literal", adoptedTrees]],
			isTreeInAgeRangeExpression,
			TREE_GRAY_COLOR,
		];

		const areOnlyAdoptedTreesVisibleExpression: Expression = [
			"==",
			areOnlyMyAdoptedTreesVisible,
			true,
		];

		/**
		 * water_sum contains the sum of all waterings in the last 30 days of a tree excluding the current day
		 * if the sum is greater than 0, the tree was watered
		 */
		const isTreeWateredInLast30DaysExpression: Expression = [
			">",
			["round", ["get", "water_sum"]],
			0,
		];

		/**
		 * if the tree was watered in the last 30 days, today or is in the age range, return the color
		 */
		const isLastWateredAndInAgeRangeExpression: Expression = [
			"case",
			[
				"any",
				["in", ["get", "id"], ["literal", Object.keys(todaysWaterings)]],
				isTreeWateredInLast30DaysExpression,
			],
			isTreeInAgeRangeExpression,
			TREE_GRAY_COLOR,
		];

		if (areLastWateredTreesVisible) {
			return isLastWateredAndInAgeRangeExpression;
		}

		return [
			"case",

			/**
			 * if only adopted trees are visible,
			 * then use the isTreeAdoptedAndInAgeRangeExpression to check
			 * if the tree is adopted by the user AND in the selected age range
			 * and return the color
			 */
			areOnlyAdoptedTreesVisibleExpression,
			isTreeAdoptedAndInAgeRangeExpression,

			/**
			 * default color for trees that don't match the conditions
			 */
			TREE_GRAY_COLOR,
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
