import React, { FC } from 'react';
import styled from 'styled-components';
import ExpandablePanel from '../ExpandablePanel';

import CardDescription from '../Card/CardDescription';

const StyledCardHeadlineMail = styled.div`
  font-size: 0.8rem;
`;

const CardCredentials: FC<{
  username: string;
  email: string;
}> = ({ username, email }) => (
  <ExpandablePanel isExpanded title='Dein Account'>
    <StyledCardHeadlineMail>{username}</StyledCardHeadlineMail>
    <StyledCardHeadlineMail>{email}</StyledCardHeadlineMail>
    <CardDescription>Registrierte E-Mail Adresse</CardDescription>
  </ExpandablePanel>
);

export default CardCredentials;
