import { quotesTag } from '../components/Quotes';

describe('quotesTag', () => {
  test('wraps a single string in quotation marks', () => {
    expect(quotesTag`hello`).toBe(`&bdquo;hello&ldquo;`);
  });

  test('wraps multiple strings in quotation marks', () => {
    const world = 'world';
    expect(quotesTag`hello ${world} ${23}`).toBe(
      `&bdquo;hello world 23&ldquo;`
    );
  });

  test('returns an empty string when provided an empty array', () => {
    expect(quotesTag``).toBe(`&bdquo;&ldquo;`);
  });
  test('should work with undefined and null', () => {
    expect(quotesTag`${undefined}`).toBe(`&bdquo;undefined&ldquo;`);
    expect(quotesTag`hello ${null}`).toBe(`&bdquo;hello null&ldquo;`);
  });
});
