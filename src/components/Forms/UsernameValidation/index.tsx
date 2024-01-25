import React, { useEffect, useState } from 'react';
import SmallParagraph from '../../SmallParagraph';
import { ValidOrNot } from '../ValidOrNot';
import { UsernamePattern } from '../../../utils/validateUsername';

export const UsernameValidation = ({
  patterns,
}: {
  patterns: UsernamePattern;
}) => {
  const [errors, setErrors] = useState<UsernamePattern>({
    minLength: false,
    maxLength: false,
    allowedCharacters: false,
    notTaken: false,
  });

  useEffect(() => {
    setErrors(patterns);
  }, [patterns]);

  return (
    <>
      <SmallParagraph>
        Dein Benutzername sollte zwischen 3{' '}
        <ValidOrNot success={errors.minLength} /> und 50{' '}
        <ValidOrNot success={errors.maxLength} /> Zeichen lang sein, nur aus
        Zeichen und Zahlen (ohne Leerzeichen am Anfang und Ende){' '}
        <ValidOrNot success={errors.allowedCharacters} /> bestehen und naturlich
        nicht vergeben sein <ValidOrNot success={errors.notTaken} />
      </SmallParagraph>
    </>
  );
};
