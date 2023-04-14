import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { AccountEditModal, ModalViewTypes } from '../AccountEditModal';
import ExpandablePanel from '../ExpandablePanel';
import { StyledA } from '../Forms';
import SmallParagraph from '../SmallParagraph';
import { PasswordEditModal } from '../PasswordEditModal';

export const CredentialValue = styled.p`
  display: block;
  font-size: ${p => p.theme.fontSizeL};
  margin: 0 0 4px;
`;

const CardCredentials: FC<{
  username: string;
  email: string;
}> = ({ username, email }) => {
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [modalView, setModalView] = useState<ModalViewTypes>('account');
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  return (
    <>
      <AccountEditModal
        isOpen={isBeingEdited}
        setIsOpen={setIsBeingEdited}
        view={modalView}
      ></AccountEditModal>
      {isEditingPassword && (
        <PasswordEditModal onClose={() => setIsEditingPassword(false)} />
      )}
      <ExpandablePanel isExpanded title='Dein Account'>
        <SmallParagraph>Benutzername</SmallParagraph>
        <CredentialValue>{username}</CredentialValue>
        <SmallParagraph>Registrierte E-Mail Adresse</SmallParagraph>
        <CredentialValue>{email}</CredentialValue>
        <SmallParagraph>
          Benutzername oder E-Mail{' '}
          <StyledA
            onClick={e => {
              e.preventDefault();
              setModalView('account');
              setIsBeingEdited(true);
            }}
          >
            bearbeiten?
          </StyledA>
        </SmallParagraph>
        <SmallParagraph>
          Passwort{' '}
          <StyledA
            onClick={e => {
              e.preventDefault();
              setIsEditingPassword(true);
            }}
          >
            ändern?
          </StyledA>
        </SmallParagraph>
      </ExpandablePanel>
    </>
  );
};

export default CardCredentials;
