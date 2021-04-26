import { getWaterNeedByAge } from './getWaterNeedByAge';

describe('getWaterNeedByAge', () => {
  test('should return 0 if age is undefined', () => {
    expect(getWaterNeedByAge()).toStrictEqual(0);
    expect(getWaterNeedByAge(undefined)).toStrictEqual(0);
  });

  test('should return 1 if age is equal to 40', () => {
    expect(getWaterNeedByAge(39)).not.toStrictEqual(1);
    expect(getWaterNeedByAge(40)).toStrictEqual(1);
    expect(getWaterNeedByAge(41)).toStrictEqual(1);
  });

  test('should return 2 if age is between 15 and 40', () => {
    expect(getWaterNeedByAge(40)).not.toStrictEqual(2);
    expect(getWaterNeedByAge(15)).toStrictEqual(2);
    expect(getWaterNeedByAge(24)).toStrictEqual(2);
    expect(getWaterNeedByAge(39)).toStrictEqual(2);
  });

  test('should return 3 if age is lower than 15', () => {
    expect(getWaterNeedByAge(15)).not.toStrictEqual(3);
    expect(getWaterNeedByAge(17)).not.toStrictEqual(3);
    expect(getWaterNeedByAge(14)).toStrictEqual(3);
    expect(getWaterNeedByAge(3)).toStrictEqual(3);
  });
});
