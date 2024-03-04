import {
  brokenColor,
  defaultColor,
  workingColor,
  lockedColor,
  pumpToColor,
} from './mapColorUtil';

describe('colors of mapColorUtil', () => {
  test('should provide brokenColor', () => {
    expect(brokenColor.cmyk).toHaveLength(4);
    expect(brokenColor.rgba).toHaveLength(4);
    expect(brokenColor.hex).toHaveLength(7);
    expect(brokenColor.hsb).toHaveLength(3);
    expect(brokenColor.hsl).toHaveLength(3);
    expect(brokenColor.lab).toHaveLength(3);
    expect(brokenColor.name).toBeDefined();
  });
  test('should provide defaultColor', () => {
    expect(defaultColor.cmyk).toHaveLength(4);
    expect(defaultColor.rgba).toHaveLength(4);
    expect(defaultColor.hex).toHaveLength(7);
    expect(defaultColor.hsb).toHaveLength(3);
    expect(defaultColor.hsl).toHaveLength(3);
    expect(defaultColor.lab).toHaveLength(3);
    expect(defaultColor.name).toBeDefined();
  });
  test('should provide workingColor', () => {
    expect(workingColor.cmyk).toHaveLength(4);
    expect(workingColor.rgba).toHaveLength(4);
    expect(workingColor.hex).toHaveLength(7);
    expect(workingColor.hsb).toHaveLength(3);
    expect(workingColor.hsl).toHaveLength(3);
    expect(workingColor.lab).toHaveLength(3);
    expect(workingColor.name).toBeDefined();
  });
  test('should provide lockedColor', () => {
    expect(lockedColor.cmyk).toHaveLength(4);
    expect(lockedColor.rgba).toHaveLength(4);
    expect(lockedColor.hex).toHaveLength(7);
    expect(lockedColor.hsb).toHaveLength(3);
    expect(lockedColor.hsl).toHaveLength(3);
    expect(lockedColor.lab).toHaveLength(3);
    expect(lockedColor.name).toBeDefined();
  });
});
