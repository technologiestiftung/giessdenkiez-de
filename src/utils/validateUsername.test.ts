import { validateUsername } from './validateUsername';

describe('Username validation', () => {
  test('Validates username with minimum criteria', () => {
    const username = 'abc';
    const { usernameIsValid } = validateUsername(username);
    expect(usernameIsValid).toBe(true);
  });
  test('Validates username with maximim criteria', () => {
    const username = 'abcdefghijklmnopqrstabcdefghijklmnopqrst1234567890';
    const { usernameIsValid } = validateUsername(username);
    expect(usernameIsValid).toBe(true);
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

  test('Allow username with spaces', () => {
    const username = 'abc def';
    const { usernameIsValid } = validateUsername(username);
    expect(usernameIsValid).toBe(true);
  });
});
