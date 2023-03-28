import React from 'react';
import styled from 'styled-components';

function uuidv4(): string {
  const cryptoObj = window.crypto || window['msCrypto'];
  if (!cryptoObj) {
    return '';
  }

  const bytes = new Uint8Array(16);
  cryptoObj.getRandomValues(bytes);

  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex = Array.prototype.map
    .call(bytes, (x: number) => ('00' + x.toString(16)).slice(-2))
    .join('');

  return (
    hex.substr(0, 8) +
    '-' +
    hex.substr(8, 4) +
    '-4' +
    hex.substr(12, 3) +
    '-' +
    hex.substr(16, 4) +
    '-' +
    hex.substr(20)
  );
}

export function createUserNotification({
  message,
  type,
  dispatchedFrom,
}: {
  message: string;
  type: UserNotificationType;
  dispatchedFrom?: string;
}): UserNotificationObjectType {
  return {
    id: uuidv4(),
    message,
    type,
    dispatchedFrom,
  };
}
export type UserNotificationObjectType = {
  message: string;
  type: UserNotificationType;
  id?: string;
  dispatchedFrom?: string;
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
  margin: 10px 0;
`;

export const UserNotification = ({
  message,
  type,
}: {
  message: string;
  type: UserNotificationType;
}) => <StyledDiv type={type}>{message}</StyledDiv>;
