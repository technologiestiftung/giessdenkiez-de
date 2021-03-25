export const getWaterNeedByAge = (age?: number): number => {
  if (!age) return 0;
  if (age < 15) return 3;
  if (age >= 15 && age < 40) return 2;
  if (age >= 40) return 1;
  return 0;
};
