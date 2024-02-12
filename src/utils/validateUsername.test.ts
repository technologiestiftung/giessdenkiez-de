import { validateUsername } from './validateUsername';

describe('Username validation', () => {
  it('should reject a username with fewer than 3 characters', () => {
    const givenUsername = 'ab';

    const actualResult = validateUsername(givenUsername);

    expect(actualResult.patterns.allowedLength).toBe(false);
    expect(actualResult.patterns.allowedCharacters).toBe(true);
    expect(actualResult.isUsernameValid).toBe(false);
  });

  it('should reject a username with more than 50 characters', () => {
    const givenUsername = 'a'.repeat(51);

    const actualResult = validateUsername(givenUsername);

    expect(actualResult.patterns.allowedLength).toBe(false);
    expect(actualResult.patterns.allowedCharacters).toBe(true);
    expect(actualResult.isUsernameValid).toBe(false);
  });

  it('should reject a username with special characters', () => {
    const givenUsername = 'abc@';

    const actualResult = validateUsername(givenUsername);

    expect(actualResult.patterns.allowedLength).toBe(true);
    expect(actualResult.patterns.allowedCharacters).toBe(false);
    expect(actualResult.isUsernameValid).toBe(false);
  });

  it('should reject a username with spaces at the beginning and end', () => {
    const givenUsername = ' abc ';

    const actualResult = validateUsername(givenUsername);

    expect(actualResult.patterns.allowedLength).toBe(true);
    expect(actualResult.patterns.allowedCharacters).toBe(false);
    expect(actualResult.isUsernameValid).toBe(false);
  });

  it('should allow a username with letters', () => {
    const givenUsername = 'abcd';

    const actualResult = validateUsername(givenUsername);

    expect(actualResult.patterns.allowedLength).toBe(true);
    expect(actualResult.patterns.allowedCharacters).toBe(true);
    expect(actualResult.isUsernameValid).toBe(true);
  });

  it('should allow a username with numbers', () => {
    const givenUsername = '1234';

    const actualResult = validateUsername(givenUsername);

    expect(actualResult.isUsernameValid).toBe(true);
  });

  it('should allow a username with spaces in the middle', () => {
    const givenUsername = 'abc  123';

    const actualResult = validateUsername(givenUsername);

    expect(actualResult.isUsernameValid).toBe(true);
  });
});
