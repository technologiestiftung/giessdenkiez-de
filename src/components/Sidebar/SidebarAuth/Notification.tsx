import React from 'react';
import styled from 'styled-components';

const StyledSuccessDiv = styled.div`
  background: ${p => p.theme.colorPrimary};
  color: ${p => p.theme.colorTextDark};
  padding: 10px;
  border-radius: 5px;
`;
const StyledErrorDiv = styled.div`
  background: ${p => p.theme.colorAlarm}};
  color: ${p => p.theme.colorTextDark};
  padding: 10px;
  border-radius: 5px;
`;
export const UserNotification = ({
  message,
  type = 'error',
}: {
  message: string;
  type?: 'success' | 'error';
}) => {
  if (type === 'success') return <StyledSuccessDiv>{message}</StyledSuccessDiv>;

  return (
    <StyledErrorDiv>
      <p>{message}</p>
    </StyledErrorDiv>
  );
};
