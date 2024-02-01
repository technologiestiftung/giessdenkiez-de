import React, { useEffect, useState } from 'react';
import {
  PasswordPattern,
  specialCharacters,
  validatePassword,
} from '../../../utils/validatePassword';
import SmallParagraph from '../../SmallParagraph';
import { ValidOrNot } from '../ValidOrNot';

export const PasswordValidation = ({ password }: { password: string }) => {
  const [errors, setErrors] = useState<PasswordPattern>({
    length: false,
    lowerCase: false,
    upperCase: false,
    specialChar: false,
    digit: false,
  });

  useEffect(() => {
    const { patterns } = validatePassword(password);
    setErrors(patterns);
  }, [password]);

  return (
    <>
      <SmallParagraph>
        Dein Passwort sollte: Mindestens 8 Zeichen lang sein{' '}
        <ValidOrNot success={errors.length} />, Klein- und Großbuchstaben{' '}
        <ValidOrNot success={errors.lowerCase && errors.upperCase} />,
        mindestens eines dieser Sonderzeichen <code>{specialCharacters}</code>{' '}
        <ValidOrNot success={errors.specialChar} /> und Zahlen{' '}
        <ValidOrNot success={errors.digit} /> enthalten.
      </SmallParagraph>
    </>
  );
};
