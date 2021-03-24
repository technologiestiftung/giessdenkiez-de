import React, { FC } from 'react';
import styled from 'styled-components';
import ExpandablePanel from '../ExpandablePanel';
import SmallParagraph from '../SmallParagraph';

const CredentialValue = styled.p`
  display: block;
  font-size: ${p => p.theme.fontSizeL};
  margin: 0 0 4px;
`;

const CardCredentials: FC<{
  username: string;
  email: string;
}> = ({ username, email }) => (
  <ExpandablePanel isExpanded title='Dein Account'>
    <CredentialValue>{username}</CredentialValue>
    <CredentialValue>{email}</CredentialValue>
    <SmallParagraph>Registrierte E-Mail Adresse</SmallParagraph>
  </ExpandablePanel>
);

export default CardCredentials;
