import React, { memo } from 'react';
import {
  specialCharacters,
  validatePassword,
} from '../../../utils/validatePassword';
import SmallParagraph from '../../SmallParagraph';
import { ValidOrNot } from '../ValidOrNot';

export const PasswordValidation = memo(function PasswordValidation({
  password,
}: {
  password: string;
}) {
  const { patterns: errors } = validatePassword(password);

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
});
