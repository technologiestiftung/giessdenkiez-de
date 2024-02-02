export interface UsernamePattern {
  minLength: boolean;
  maxLength: boolean;
  allowedCharacters: boolean;
  taken: boolean;
  allowedLength: boolean;
}

export function validateUsername(
  username: string
): { usernameIsValid: boolean; patterns: UsernamePattern } {
  const patterns = {
    allowedLength: username.length >= 3 && username.length <= 50,
    minLength: username.length >= 3,
    maxLength: username.length <= 50,
    allowedCharacters: /^[a-zA-Z0-9]+(\s+[a-zA-Z0-9]+)*$/.test(username),
    taken: false,
  };

  return { patterns, usernameIsValid: Object.values(patterns).every(Boolean) };
}
