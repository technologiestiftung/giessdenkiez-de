import React from 'react';
import SmallParagraph from '../../SmallParagraph';
import { ValidOrNot } from '../ValidOrNot';
import { UsernamePattern } from '../../../utils/validateUsername';
import useLocalizedContent from '../../../utils/hooks/useLocalizedContent';

export const UsernameValidation = ({
  patterns,
}: {
  patterns: UsernamePattern;
}) => {
  const content = useLocalizedContent();
  const {
    intro,
    and,
    length,
    specialCharacters,
  } = content.auth.usernameRestrictions;

  return (
    <>
      <SmallParagraph>
        {intro} 3 {and} 50 {length}{' '}
        <ValidOrNot success={patterns.allowedLength} /> {specialCharacters}{' '}
        <ValidOrNot success={patterns.allowedCharacters} />
      </SmallParagraph>
    </>
  );
};
