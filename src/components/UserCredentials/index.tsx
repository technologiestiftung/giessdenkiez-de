import React, { FC } from 'react';
import styled from 'styled-components';
import { AccountEditModal } from '../AccountEditModal';
import ExpandablePanel from '../ExpandablePanel';
import { StyledA } from '../Forms';
import {} from '../Sidebar/SidebarAuth/Notification';
import SmallParagraph from '../SmallParagraph';

const CredentialValue = styled.p`
  display: block;
  font-size: ${p => p.theme.fontSizeL};
  margin: 0 0 4px;
`;

const CardCredentials: FC<{
  username: string;
  email: string;
}> = ({ username, email }) => {
  const [isBeingEdited, setIsBeingEdited] = React.useState(false);
  return (
    <>
      <AccountEditModal
        isOpen={isBeingEdited}
        setIsOpen={setIsBeingEdited}
      ></AccountEditModal>
      <ExpandablePanel isExpanded title='Dein Account'>
        <CredentialValue>{username}</CredentialValue>
        <CredentialValue>{email}</CredentialValue>
        <SmallParagraph>Registrierte E-Mail Adresse</SmallParagraph>
        <SmallParagraph>
          Account{' '}
          <StyledA
            onClick={e => {
              e.preventDefault();
              setIsBeingEdited(true);
            }}
          >
            bearbeiten?
          </StyledA>
        </SmallParagraph>
      </ExpandablePanel>
    </>
  );
};

export default CardCredentials;
