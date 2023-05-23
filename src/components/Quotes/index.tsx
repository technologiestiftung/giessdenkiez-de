import React from 'react';
/**
 * Use typografically correct quotes for german
 */
export const Quotes: React.FC = ({ children }) => {
  return <span>&bdquo;{children}&ldquo;</span>;
};
