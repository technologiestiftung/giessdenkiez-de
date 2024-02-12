import React from 'react';
/**
 * Use typografically correct quotes for german
 */
export const Quotes: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <span>&bdquo;{children}&ldquo;</span>;
};
