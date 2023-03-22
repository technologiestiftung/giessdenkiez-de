import React from 'react';
import styled from 'styled-components';

export type UserNotificationObjectType = {
  message: string;
  type: UserNotificationType;
};
export type UserNotificationType = 'success' | 'error';

interface StyledMessageProps {
  type: UserNotificationType;
}
const StyledDiv = styled.div<StyledMessageProps>`
  background: ${p =>
    p.type === 'success' ? p.theme.colorPrimary : p.theme.colorAlarm};
  color: ${p => p.theme.colorTextDark};
  padding: 10px;
  border-radius: 5px;
`;

export const UserNotification = ({
  message,
  type,
}: {
  message: string;
  type: UserNotificationType;
}) => <StyledDiv type={type}>{message}</StyledDiv>;
