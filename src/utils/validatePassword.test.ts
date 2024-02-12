import { validatePassword } from './validatePassword';

describe('Password validation', () => {
  test('Validates password with minimum criteria', () => {
    const password = 'A1@abcdef';

    const { patterns, isPasswordValid } = validatePassword(password);

    expect(patterns.length).toBe(true);
    expect(patterns.lowerCase).toBe(true);
    expect(patterns.upperCase).toBe(true);
    expect(patterns.specialChar).toBe(true);
    expect(patterns.digit).toBe(true);
    expect(isPasswordValid).toBe(true);
  });

  test('Rejects password with fewer than 8 characters', () => {
    const password = 'A1@abc';

    const { patterns, isPasswordValid } = validatePassword(password);

    expect(patterns.length).toBe(false);
    expect(isPasswordValid).toBe(false);
  });

  test('Rejects password without a lowercase letter', () => {
    const password = 'A1@BCDEF';

    const { patterns, isPasswordValid } = validatePassword(password);

    expect(patterns.lowerCase).toBe(false);
    expect(isPasswordValid).toBe(false);
  });

  test('Rejects password without an uppercase letter', () => {
    const password = '1@abcdef';

    const { patterns, isPasswordValid } = validatePassword(password);

    expect(patterns.upperCase).toBe(false);
    expect(isPasswordValid).toBe(false);
  });

  test('Rejects password without a digit', () => {
    const password = 'A@abcdef';

    const { patterns, isPasswordValid } = validatePassword(password);

    expect(patterns.digit).toBe(false);
    expect(isPasswordValid).toBe(false);
  });

  test('Rejects password without a special character', () => {
    const password = 'A1abcdef';

    const { patterns, isPasswordValid } = validatePassword(password);

    expect(patterns.specialChar).toBe(false);
    expect(isPasswordValid).toBe(false);
  });
});
