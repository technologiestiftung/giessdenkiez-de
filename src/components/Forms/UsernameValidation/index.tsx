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
  const { part1, and, part2, part3 } = content.auth.usernameRestrictions;
  return (
    <>
      <SmallParagraph>
        {part1} 3 <ValidOrNot success={patterns.minLength} /> {and} 50{' '}
        <ValidOrNot success={patterns.maxLength} /> {part2}{' '}
        <ValidOrNot success={patterns.allowedCharacters} /> {part3}{' '}
        <ValidOrNot success={patterns.notTaken} />
      </SmallParagraph>
    </>
  );
};
