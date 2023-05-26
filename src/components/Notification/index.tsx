import React from 'react';
import styled from 'styled-components';

export function createUserNotification({
  message,
  type,
}: {
  message: string;
  type: UserNotificationType;
  dispatchedFrom?: string;
}): UserNotificationObjectType {
  return {
    message,
    type,
  };
}
export type UserNotificationObjectType = {
  message: string;
  type: UserNotificationType;
};
export type UserNotificationType = 'success' | 'error';

interface StyledMessageProps {
  type?: UserNotificationType;
}
const StyledDiv = styled.div<StyledMessageProps>`
  background: ${p => {
    switch (p.type) {
      case 'success':
        return p.theme.colorPrimary;
      case 'error':
        return p.theme.colorAlarm;
      default:
        return undefined;
    }
  }};
  color: ${p => p.theme.colorTextDark};
  padding: 10px;
  border-radius: 5px;
  margin: 0;
`;

export const UserNotification = ({
  message,
  type,
  style,
}: {
  message: string;
  type: UserNotificationType;
  style?: React.CSSProperties;
}) => (
  <StyledDiv type={type} style={style}>
    {message}
  </StyledDiv>
);

UserNotification.displayName = 'UserNotification';
export const UserNotificationSpacer = () => <StyledDiv>&nbsp;</StyledDiv>;
