export interface UsernamePattern {
  minLength: boolean;
  maxLength: boolean;
  allowedCharacters: boolean;
  notTaken: boolean;
}

export function validateUsername(
  username: string
): { usernameIsValid: boolean; patterns: UsernamePattern } {
  const patterns = {
    minLength: username.length >= 3,
    maxLength: username.length <= 50,
    allowedCharacters: /^[a-zA-Z0-9]+(\s+[a-zA-Z0-9]+)*$/.test(username),
    notTaken: true,
  };

  return { patterns, usernameIsValid: Object.values(patterns).every(Boolean) };
}
