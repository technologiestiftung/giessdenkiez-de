import React from 'react';
import styled from 'styled-components';

interface StyledSpanProps {
  $success: boolean;
}

const StyledSpan = styled.span<StyledSpanProps>`
  color: ${p => (p.$success ? p.theme.colorPrimary : p.theme.colorAlarm)};
`;

export const ValidOrNot = ({ success }: { success: boolean }) => {
  return <StyledSpan $success={success}>{success ? '✓' : '☓'}</StyledSpan>;
};
