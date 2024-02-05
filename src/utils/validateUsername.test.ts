import { validateUsername } from './validateUsername';

describe('Username validation', () => {
  // since this is only a unit we don't look up used names in the database
  // and taken will always be false
  const validExpectTaken = {
    allowedLength: true,
    minLength: true,
    maxLength: true,
    allowedCharacters: true,
    taken: false,
  };
  test('Validates username with minimum criteria', () => {
    const username = 'abc';
    const { patterns } = validateUsername(username);
    expect(patterns.minLength).toBe(true);
    expect(patterns).toMatchObject(validExpectTaken);
  });
  test('Validates username with maximim criteria', () => {
    const username = 'abcdefghijklmnopqrstabcdefghijklmnopqrst1234567890';
    const { patterns } = validateUsername(username);
    expect(patterns.maxLength).toBe(true);
    expect(patterns).toMatchObject(validExpectTaken);
  });
  test('Allow username with spaces', () => {
    const username = 'abc def';
    const { patterns } = validateUsername(username);
    expect(patterns.allowedCharacters).toBe(true);
    expect(patterns).toMatchObject(validExpectTaken);
  });
  test('Rejects username with fewer than 3 characters', () => {
    const username = 'ab';
    const { usernameIsValid } = validateUsername(username);
    expect(usernameIsValid).toBe(false);
  });
  test('Rejects username with more than 50 characters', () => {
    const username = 'abcdefghijklmnopqrstabcdefghijklmnopqrst12345678901';
    const { usernameIsValid } = validateUsername(username);
    expect(usernameIsValid).toBe(false);
  });
  test('Rejects username with special characters', () => {
    const username = 'abc@';
    const { usernameIsValid } = validateUsername(username);
    expect(usernameIsValid).toBe(false);
  });
});
