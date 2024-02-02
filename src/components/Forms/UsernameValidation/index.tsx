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
        Dein Benutzername sollte zwischen 3 und 50 Zeichen lang sein{' '}
        <ValidOrNot success={patterns.allowedLength} />, nur aus Zeichen und
        Zahlen bestehen, ohne Leerzeichen am Anfang und Ende{' '}
        <ValidOrNot success={patterns.allowedCharacters} />.
      </SmallParagraph>
    </>
  );
};
