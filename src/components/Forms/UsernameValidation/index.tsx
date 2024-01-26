import React from 'react';
import SmallParagraph from '../../SmallParagraph';
import { ValidOrNot } from '../ValidOrNot';
import { UsernamePattern } from '../../../utils/validateUsername';

export const UsernameValidation = ({
  patterns,
}: {
  patterns: UsernamePattern;
}) => {
  return (
    <>
      <SmallParagraph>
        Dein Benutzername sollte zwischen 3{' '}
        <ValidOrNot success={patterns.minLength} /> und 50{' '}
        <ValidOrNot success={patterns.maxLength} /> Zeichen lang sein, nur aus
        Zeichen und Zahlen (ohne Leerzeichen am Anfang und Ende){' '}
        <ValidOrNot success={patterns.allowedCharacters} /> bestehen und
        naturlich nicht vergeben sein <ValidOrNot success={patterns.notTaken} />
      </SmallParagraph>
    </>
  );
};
