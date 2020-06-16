/* eslint-disable jest/consistent-test-it */
/* eslint-disable jest/no-hooks */
import { checkGeolocationFeature } from './index';

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
  getCurrentPosition: jest.fn().mockImplementation((success, fail) => {
    return Promise.resolve(success(result));
  }),
};

describe('utilities geolocation', () => {
  beforeAll(() => {
    //@ts-ignore
    global.navigator.geolocation = mockGeolocation;
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  test('checkGeolocationFeature success', () => {
    const successHandler = jest.fn();
    const errorHandler = jest.fn();
    checkGeolocationFeature(errorHandler, successHandler);
    expect(successHandler).toHaveBeenCalledTimes(1);
    expect(successHandler).toHaveBeenCalledWith(result);
    expect(errorHandler).not.toHaveBeenCalled();
  });
});
