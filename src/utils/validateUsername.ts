export interface UsernamePattern {
  allowedCharacters: boolean;
  allowedLength: boolean;
}

export function validateUsername(
  username: string
): { isUsernameValid: boolean; patterns: UsernamePattern } {
  const patterns = {
    allowedLength: username.length >= 3 && username.length <= 50,
    allowedCharacters: /^[a-zA-Z0-9]+(\s+[a-zA-Z0-9]+)*$/.test(username),
  };

  return {
    patterns,
    isUsernameValid: patterns.allowedLength && patterns.allowedCharacters,
  };
}
