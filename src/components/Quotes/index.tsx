import React from 'react';
/**
 * Use typografically correct quotes for german
 */
export const Quotes: React.FC = ({ children }) => {
  return <span>&bdquo;{children}&ldquo;</span>;
};
/**
 * Returns a formatted string containing the provided strings wrapped in quotation marks.
 *
 */

type InterpolationItem = string | number | boolean | undefined | null;

export function quotesTag(
  strings: TemplateStringsArray,
  ...values: InterpolationItem[]
): string {
  let result = '';
  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
    if (i < values.length) {
      const value = String(values[i]);
      result += `${value}`;
    }
  }
  return `&bdquo;${result}&ldquo;`;
}
