import {
	TreeAgeClassification,
	TreeAgeClassificationState,
	TreeCoreData,
} from "../tree-types";

export function useTreeAgeClassification(
	treeData?: TreeCoreData,
	referenceDate?: Date,
): TreeAgeClassificationState {
	console.log(treeData);

	const BABY_AGE_LIMIT = 4;
	const JUNIOR_TREES_AGE_LIMIT = 10;

	const treeAgeClassification = () => {
		if (!treeData || !treeData.pflanzjahr || treeData.pflanzjahr === 0) {
			return TreeAgeClassification.UNKNOWN;
		}
		const age =
			(referenceDate ?? new Date()).getFullYear() - treeData.pflanzjahr;
		if (age <= BABY_AGE_LIMIT) {
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
