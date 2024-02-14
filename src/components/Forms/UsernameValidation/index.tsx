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
    restrictions,
    notTaken,
  } = content.auth.usernameRestrictions;
  return (
    <>
      <SmallParagraph>
        {intro} 3 <ValidOrNot success={patterns.minLength} /> {and} 50{' '}
        <ValidOrNot success={patterns.maxLength} /> {restrictions}{' '}
        <ValidOrNot success={patterns.allowedCharacters} /> {notTaken}{' '}
        <ValidOrNot success={patterns.notTaken} />
      </SmallParagraph>
    </>
  );
};
