export const specialCharacters = '@#$%&*()!_+=:;';
export const specialCharactersRegex = new RegExp(`[${specialCharacters}]`);

export interface PasswordPattern {
  length: boolean;
  lowerCase: boolean;
  upperCase: boolean;
  specialChar: boolean;
  digit: boolean;
}
export function validatePassword(
  password: string
): { isPasswordValid: boolean; patterns: PasswordPattern } {
  const patterns = {
    length: password.length >= 8,
    lowerCase: /[a-z]/.test(password),
    upperCase: /[A-Z]/.test(password),
    specialChar: specialCharactersRegex.test(password),
    digit: /[0-9]/.test(password),
  };
  return {
    patterns,
    isPasswordValid: Object.values(patterns).every(pattern => pattern === true),
  };
}
