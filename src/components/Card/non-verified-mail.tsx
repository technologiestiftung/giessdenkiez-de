import React from 'react';
import CardParagraph from './CardParagraph';

export const NonVerfiedMailCardParagraph = () => {
  return (
    <CardParagraph>
      Du hast deine E-Mail Adresse noch nicht verifiziert. Bitte wirf einen
      Blick in dein Postfach ob du eine Mail von
      &ldquo;no-reply@auth0user.net&ldquo; erhalten hast und klicke auf den
      enthaltenen Link um dies zu tun. Vielleicht sind wir auch im Spam Ordern
      gelandet?
    </CardParagraph>
  );
};
