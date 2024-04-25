import {
	TreeAgeClassification,
	TreeCoreData,
	TreeWateringData,
	TreeWateringDataState,
} from "../tree-types.js";

import resolveConfig from "tailwindcss/resolveConfig";
//@ts-expect-error tailwindConfig has no type definition
import tailwindConfig from "../../../../tailwind.config.js";
const fullConfig = resolveConfig(tailwindConfig);

export function useTreeWaterNeedsData(
	treeData: TreeCoreData,
	treeWateringData: TreeWateringData[],
	treeAgeClassification: TreeAgeClassification,
): TreeWateringDataState {
	const UNKNOWN_TREES_WATERING_AMOUNT = 200;
	const BABY_TREES_WATERING_AMOUNT = 100;
	const JUNIOR_TREES_WATERING_AMOUNT = 200;
	const SENIOR_TREES_WATERING_AMOUNT = 300;
	const NUMBER_OF_DAYS_TO_LOOK_AT = 30;

	// OTHER_WATERING_COLOR is the color for watering by groundwater and bezirksamt
	const OTHER_WATERING_COLOR = fullConfig.theme.colors["gdk-light-blue"];
	const USER_WATERING_COLOR = fullConfig.theme.colors["gdk-watering-blue"];
	const RAIN_COLOR = fullConfig.theme.colors["gdk-rain-blue"];

	const referenceWaterAmount = () => {
		switch (treeAgeClassification) {
			case TreeAgeClassification.BABY:
				return BABY_TREES_WATERING_AMOUNT;
			case TreeAgeClassification.JUNIOR:
				return JUNIOR_TREES_WATERING_AMOUNT;
			case TreeAgeClassification.SENIOR:
				return SENIOR_TREES_WATERING_AMOUNT;
			default:
				return UNKNOWN_TREES_WATERING_AMOUNT;
		}
	};

	const rainSum = () => {
		if (treeData && treeData.radolan_days) {
			const rains = [...treeData.radolan_days];
			rains.reverse();
			const lastXDays = rains.slice(0, NUMBER_OF_DAYS_TO_LOOK_AT * 24);
			const sum = lastXDays.reduce((l: number, r: number) => l + r, 0) / 10;
			return sum;
		}
		return 0;
	};

	const wateringSum = () => {
		const daysAgo = new Date();
		daysAgo.setDate(daysAgo.getDate() - NUMBER_OF_DAYS_TO_LOOK_AT);
		const wateringsLastXDays = treeWateringData.filter(
			(w) => new Date(w.timestamp).getTime() > daysAgo.getTime(),
		);
		if (treeWateringData) {
			const sum = wateringsLastXDays
				.map((w) => w.amount)
				.reduce((l: number, r: number) => l + r, 0);
			return sum;
		}
		return 0;
	};

	const rainPercentage = () => {
		const wateringRatio = wateringSum() / referenceWaterAmount();
		const ratio = rainSum() / referenceWaterAmount();
		if (ratio >= 1) {
			return 1 - wateringRatio;
		}
		return ratio;
	};

	const userWateringPercentage = () => {
		const rainRatio = rainSum() / referenceWaterAmount();
		const ratio = wateringSum() / referenceWaterAmount();
		if (ratio >= 1 - rainRatio) {
			return 1 - rainRatio;
		}
		return ratio;
	};

	const otherWateringPercentage = () => {
		if (
			treeAgeClassification === TreeAgeClassification.UNKNOWN ||
			treeAgeClassification === TreeAgeClassification.JUNIOR
		) {
			return 0;
		}
		const ratio = Math.max(0, 1 - rainPercentage() - userWateringPercentage());
		return ratio;
	};

	const stillMissingWater = () => {
		return Math.round(
			Math.max(0, referenceWaterAmount() - rainSum() - wateringSum()),
		);
	};

	const shouldBeWatered = () => {
		if (
			treeAgeClassification === TreeAgeClassification.BABY ||
			treeAgeClassification === TreeAgeClassification.SENIOR
		) {
			return false;
		}
		return wateringSum() + rainSum() < referenceWaterAmount();
	};

	const waterParts = () => {
		return [
			{
				color: RAIN_COLOR,
				progress: rainPercentage(),
			},
			{
				color: USER_WATERING_COLOR,
				progress: userWateringPercentage(),
			},
			{
				color: OTHER_WATERING_COLOR,
				progress: otherWateringPercentage(),
			},
		];
	};

	return {
		rainSum: rainSum(),
		wateringSum: wateringSum(),
		rainPercentage: rainPercentage(),
		wateringPercentage: userWateringPercentage(),
		otherWateringPercentage: otherWateringPercentage(),
		referenceWaterAmount: referenceWaterAmount(),
		stillMissingWater: stillMissingWater(),
		waterParts: waterParts(),
		shouldBeWatered: shouldBeWatered(),
		userWateringColor: USER_WATERING_COLOR,
		otherWateringColor: OTHER_WATERING_COLOR,
		rainColor: RAIN_COLOR,
	};
}
