import React, { FC } from 'react';
import ExpandablePanel from '../ExpandablePanel';
import Paragraph from '../Paragraph';
import SmallParagraph from '../SmallParagraph';

const CardCredentials: FC<{
  username: string;
  email: string;
}> = ({ username, email }) => (
  <ExpandablePanel isExpanded title='Dein Account'>
    <Paragraph>{username}</Paragraph>
    <Paragraph>{email}</Paragraph>
    <SmallParagraph>Registrierte E-Mail Adresse</SmallParagraph>
  </ExpandablePanel>
);

export default CardCredentials;
