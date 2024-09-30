import {
	TreeAgeClassification,
	TreeAgeClassificationState,
	TreeCoreData,
} from "../tree-types";

export function useTreeAgeClassification(
	treeData?: TreeCoreData,
	referenceDate?: Date,
): TreeAgeClassificationState {
	const specialDistrictsBabyAgeLimit = {
		Mitte: 12,
		Pankow: 11,
		Neukölln: 9,
		Lichtenberg: 12,
	};

	const isSpecialDistrict = (district: string) => {
		return Object.keys(specialDistrictsBabyAgeLimit).includes(district);
	};

	const babyAgeLimit = (district: string) => {
		if (isSpecialDistrict(district)) {
			return specialDistrictsBabyAgeLimit[
				district as keyof typeof specialDistrictsBabyAgeLimit
			];
		}
		return 4;
	};

	const JUNIOR_TREES_AGE_LIMIT = 10;

	const treeAgeClassification = () => {
		if (!treeData || !treeData.pflanzjahr || treeData.pflanzjahr === 0) {
			return TreeAgeClassification.UNKNOWN;
		}

		const age =
			(referenceDate ?? new Date()).getFullYear() - treeData.pflanzjahr;

		// Only baby and senior trees in special districts
		if (isSpecialDistrict(treeData.bezirk)) {
			if (age <= babyAgeLimit(treeData.bezirk)) {
				return TreeAgeClassification.BABY;
			}
			return TreeAgeClassification.SENIOR;
		}

		// Baby, junior and senior trees in normal districts
		if (age <= babyAgeLimit(treeData.bezirk)) {
			return TreeAgeClassification.BABY;
		}

		if (age <= JUNIOR_TREES_AGE_LIMIT) {
			return TreeAgeClassification.JUNIOR;
		}
		return TreeAgeClassification.SENIOR;
	};

	const treeAge = () => {
		if (!treeData) {
			return undefined;
		}
		return treeData.pflanzjahr === 0 ||
			treeData.pflanzjahr === null ||
			treeData.pflanzjahr === undefined
			? undefined
			: new Date().getFullYear() - treeData.pflanzjahr;
	};

	return { treeAgeClassification: treeAgeClassification(), treeAge: treeAge() };
}
