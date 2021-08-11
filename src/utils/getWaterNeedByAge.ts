export const YOUNG_TREE_MAX_AGE = 15;
export const OLD_TREE_MIN_AGE = 40;
export const LOW_WATER_NEED_NUM = 1;
export const MEDIUM_WATER_NEED_NUM = 2;
export const HIGH_WATER_NEED_NUM = 3;

export const getWaterNeedByAge = (age?: number): number => {
  if (!age) return 0;
  if (age < YOUNG_TREE_MAX_AGE) return HIGH_WATER_NEED_NUM;
  if (age >= YOUNG_TREE_MAX_AGE && age < OLD_TREE_MIN_AGE)
    return MEDIUM_WATER_NEED_NUM;
  if (age >= OLD_TREE_MIN_AGE) return LOW_WATER_NEED_NUM;
  return 0;
};
