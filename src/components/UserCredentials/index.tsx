import React, { FC } from 'react';
import styled from 'styled-components';
import ExpandablePanel from '../ExpandablePanel';

import SmallParagraph from '../SmallParagraph';

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
    <SmallParagraph>Registrierte E-Mail Adresse</SmallParagraph>
  </ExpandablePanel>
);

export default CardCredentials;
