/* eslint-disable jest/consistent-test-it */
/* eslint-disable jest/no-hooks */

import { getWaterNeedByAge } from './getWaterNeedByAge';

const result = {
  coords: {
    latitude: 52,
    longitude: 13,
  },
};
/**
 * Mock implemenation taken from here
 * Taken from here https://stackoverflow.com/a/51829561/1770432
 */
const mockGeolocation = {
  getCurrentPosition: jest.fn().mockImplementation(success => {
    return Promise.resolve(success(result));
  }),
};

describe('utilities geolocation', () => {
  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.navigator.geolocation = mockGeolocation;
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('should test getWaterNeedByAge', () => {
    expect(getWaterNeedByAge()).toBeNull();
    expect(getWaterNeedByAge(Math.floor(Math.random() * 15))).toStrictEqual([
      1,
      1,
      1,
    ]);
    expect(
      getWaterNeedByAge(Math.floor(Math.random() * (40 - 15)) + 15)
    ).toStrictEqual([1, 1]);

    expect(
      getWaterNeedByAge(Math.floor(Math.random() * 1000 + 40))
    ).toStrictEqual([1]);
  });
});
