import React from 'react';
import CardParagraph from './CardParagraph';

export const NonVerfiedMailCardParagraph = () => {
  return (
    <CardParagraph>
      Du hast deine E-Mail Adresse noch nicht verifiziert. Bitte wirf einen
      Blick in dein Postfach ob du eine Mail von "no-reply@auth0user.net"
      erhalten hast und klicke auf den enthaltenen Link um dies zu tun.
      Vielleicht sind wir auch im Spam Ordern gelandet?
    </CardParagraph>
  );
};
