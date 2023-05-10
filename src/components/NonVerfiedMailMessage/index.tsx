import React, { FC } from 'react';
import Paragraph from '../Paragraph';
import { Quotes } from '../Quotes';

export const NonVerfiedMailMessage: FC = () => {
  return (
    <Paragraph>
      Du hast deine E-Mail Adresse noch nicht verifiziert. Bitte wirf einen
      Blick in dein Postfach, ob du eine E-Mail von{' '}
      <Quotes>{process.env.NEXT_PUBLIC_FROM_EMAIL}</Quotes> erhalten hast und
      klicke auf den enthaltenen Link, um dies zu tun. Vielleicht sind wir auch
      im Spam-Ordner gelandet?
    </Paragraph>
  );
};
