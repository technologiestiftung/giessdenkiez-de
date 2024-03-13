import {
  TreeAgeClassification,
  TreeAgeClassificationState,
  TreeData,
} from "../tree-types";

export function useTreeAgeClassification(
  treeData: TreeData | undefined,
): TreeAgeClassificationState {
  const BABY_AGE_LIMIT = 3;
  const JUNIOR_TREES_AGE_LIMIT = 14;
  const SENIOR_TREES_AGE_LIMIT = 40;

  const treeAgeClassification = () => {
    if (
      !treeData ||
      !treeData.standalter ||
      treeData.standalter === "undefined"
    ) {
      return TreeAgeClassification.UNKNOWN;
    }
    const age = parseInt(treeData.standalter);
    if (age <= BABY_AGE_LIMIT) {
      return TreeAgeClassification.BABY;
    }
    if (age <= JUNIOR_TREES_AGE_LIMIT) {
      return TreeAgeClassification.JUNIOR;
    }
    if (age <= SENIOR_TREES_AGE_LIMIT) {
      return TreeAgeClassification.GROWNUP;
    }
    return TreeAgeClassification.SENIOR;
  };

  const treeAge = () => {
    if (!treeData) return undefined;
    return treeData.pflanzjahr === 0
      ? undefined
      : new Date().getFullYear() - treeData.pflanzjahr;
  };

  return { treeAgeClassification: treeAgeClassification(), treeAge: treeAge() };
}
