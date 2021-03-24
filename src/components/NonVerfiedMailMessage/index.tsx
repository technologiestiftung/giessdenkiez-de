import React, { FC } from 'react';
import Paragraph from '../Paragraph';

export const NonVerfiedMailMessage: FC = () => {
  return (
    <Paragraph>
      Du hast deine E-Mail Adresse noch nicht verifiziert. Bitte wirf einen
      Blick in dein Postfach, ob du eine E-Mail von
      &ldquo;no-reply@auth0user.net&ldquo; erhalten hast und klicke auf den
      enthaltenen Link, um dies zu tun. Vielleicht sind wir auch im Spam-Ordner
      gelandet?
    </Paragraph>
  );
};
