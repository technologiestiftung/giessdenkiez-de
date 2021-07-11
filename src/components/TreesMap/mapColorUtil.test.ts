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

describe('pumpToColor utility function', () => {
  test('should return the default color if no params provided', () => {
    expect(pumpToColor()).toBe(defaultColor.rgba);
  });
  test('should return the default color if no properties', () => {
    expect(pumpToColor({})).toBe(defaultColor.rgba);
  });
  test('should return the default color if status is unkown', () => {
    expect(pumpToColor({ properties: { 'pump:status': 'bombula' } })).toBe(
      defaultColor.rgba
    );
  });
  test('should return the default color if status is unbekannt', () => {
    expect(pumpToColor({ properties: { 'pump:status': 'unbekannt' } })).toBe(
      defaultColor.rgba
    );
  });
  test('should return the brokenColor if status is defekt', () => {
    expect(pumpToColor({ properties: { 'pump:status': 'defekt' } })).toBe(
      brokenColor.rgba
    );
  });
  test('should return the workingColor if status is funktionsfähig', () => {
    expect(
      pumpToColor({ properties: { 'pump:status': 'funktionsfähig' } })
    ).toBe(workingColor.rgba);
  });
  test('should return the lockedColor if status is verriegelt', () => {
    expect(pumpToColor({ properties: { 'pump:status': 'verriegelt' } })).toBe(
      lockedColor.rgba
    );
  });
});
