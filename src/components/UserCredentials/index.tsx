import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { AccountEditModal } from '../AccountEditModal';
import ExpandablePanel from '../ExpandablePanel';
import { StyledA } from '../Forms';
import SmallParagraph from '../SmallParagraph';
import { PasswordEditModal } from '../PasswordEditModal';
import useLocalizedContent from '../../utils/hooks/useLocalizedContent';

export const CredentialValue = styled.p`
  display: block;
  font-size: ${p => p.theme.fontSizeL};
  margin: 0 0 4px;
`;

const CardCredentials: FC<{
  username: string;
  email: string;
}> = ({ username, email }) => {
  const content = useLocalizedContent();
  const {
    title,
    username: usernameText,
    registeredMail,
    editHint,
    editLink,
    passwordEditHint,
    passwordEditLink,
  } = content.sidebar.account;

  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  return (
    <>
      {isEditingAccount && (
        <AccountEditModal
          onClose={() => setIsEditingAccount(false)}
        ></AccountEditModal>
      )}
      {isEditingPassword && (
        <PasswordEditModal onClose={() => setIsEditingPassword(false)} />
      )}
      <ExpandablePanel $isExpanded title={title}>
        <SmallParagraph>{usernameText}</SmallParagraph>
        <CredentialValue>{username}</CredentialValue>
        <SmallParagraph>{registeredMail}</SmallParagraph>
        <CredentialValue>{email}</CredentialValue>
        <SmallParagraph>
          {editHint}{' '}
          <StyledA
            onClick={e => {
              e.preventDefault();
              setIsEditingAccount(true);
            }}
          >
            {editLink}
          </StyledA>
        </SmallParagraph>
        <SmallParagraph>
          {passwordEditHint}{' '}
          <StyledA
            onClick={e => {
              e.preventDefault();
              setIsEditingPassword(true);
            }}
          >
            {passwordEditLink}
          </StyledA>
        </SmallParagraph>
      </ExpandablePanel>
    </>
  );
};

export default CardCredentials;
