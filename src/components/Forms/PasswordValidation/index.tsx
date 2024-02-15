import React, { memo } from 'react';
import {
  specialCharacters,
  validatePassword,
} from '../../../utils/validatePassword';
import SmallParagraph from '../../SmallParagraph';
import { ValidOrNot } from '../ValidOrNot';
import useLocalizedContent from '../../../utils/hooks/useLocalizedContent';

export const PasswordValidation = memo(function PasswordValidation({
  password,
}: {
  password: string;
}) {
  const content = useLocalizedContent();
  const {
    minLength,
    upperAndLowercase,
    specialCharacters: specialCharactersHint,
    containNumbers,
  } = content.auth.passwordRestrictions;

  const { patterns: errors } = validatePassword(password);

  return (
    <>
      <SmallParagraph>
        {minLength} <ValidOrNot success={errors.length} />, {upperAndLowercase}{' '}
        <ValidOrNot success={errors.lowerCase && errors.upperCase} />,
        {specialCharactersHint} <code>{specialCharacters}</code>{' '}
        <ValidOrNot success={errors.specialChar} /> {containNumbers}{' '}
        <ValidOrNot success={errors.digit} />
      </SmallParagraph>
    </>
  );
});
