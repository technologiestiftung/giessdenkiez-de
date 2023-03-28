import { validatePassword } from './validatePassword';

describe('Password validation', () => {
  test('Validates password with minimum criteria', () => {
    const password = 'A1@abcdef';
    const { success } = validatePassword(password);
    expect(success).toBe(true);
  });

  test('Rejects password with fewer than 8 characters', () => {
    const password = 'A1@abc';
    const { success } = validatePassword(password);
    expect(success).toBe(false);
  });

  test('Rejects password without a lowercase letter', () => {
    const password = 'A1@BCDEF';
    const { success } = validatePassword(password);
    expect(success).toBe(false);
  });

  test('Rejects password without an uppercase letter', () => {
    const password = '1@abcdef';
    const { success } = validatePassword(password);
    expect(success).toBe(false);
  });

  test('Rejects password without a digit', () => {
    const password = 'A@abcdef';
    const { success } = validatePassword(password);
    expect(success).toBe(false);
  });

  test('Rejects password without a special character', () => {
    const password = 'A1abcdef';
    const { success } = validatePassword(password);
    expect(success).toBe(false);
  });

  test('Validates complex password', () => {
    const password = 'Ab@34XYZ+=';
    const { success } = validatePassword(password);
    expect(success).toBe(true);
  });
});
