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
  const { part1, part2, part3, part4 } = content.auth.passwordRestrictions;

  const { patterns: errors } = validatePassword(password);

  return (
    <>
      <SmallParagraph>
        {part1} <ValidOrNot success={errors.length} />, {part2}{' '}
        <ValidOrNot success={errors.lowerCase && errors.upperCase} />,{part3}{' '}
        <code>{specialCharacters}</code>{' '}
        <ValidOrNot success={errors.specialChar} /> {part4}{' '}
        <ValidOrNot success={errors.digit} />
      </SmallParagraph>
    </>
  );
});
