import React from 'react';
import styled from 'styled-components';

import CardDescription from '../CardDescription/';

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 0 20px 0;
  margin-bottom: 20px;
  border-bottom: 1px solid ${p => p.theme.colorGreyLight};
`;

const StyledCardHeadline = styled.div`
  margin-bottom: 10px;
  font-weight: bold;
`;

const StyledCardHeadlineMail = styled.div`
  font-size: 0.8rem;
`;

const CardCredentials = (p: { email: any; username: any }) => {
  const { email, username } = p;
  return (
    <Flex>
      <StyledCardHeadline>Dein Account:</StyledCardHeadline>

      <StyledCardHeadlineMail>{username}</StyledCardHeadlineMail>
      <StyledCardHeadlineMail>{email}</StyledCardHeadlineMail>
      <CardDescription>Registrierte E-Mail Adresse</CardDescription>
    </Flex>
  );
};

export default CardCredentials;
