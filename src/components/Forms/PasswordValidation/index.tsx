import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  PasswordPattern,
  specialCharacters,
  validatePassword,
} from '../../../utils/validatePassword';
import SmallParagraph from '../../SmallParagraph';

interface StyledSpanProps {
  success: boolean;
}
const StyledSpan = styled.span<StyledSpanProps>`
  color: ${p => (p.success ? p.theme.colorPrimary : p.theme.colorAlarm)};
`;

const ValidorNot = ({ success }: { success: boolean }) => {
  return <StyledSpan success={success}>{success ? '✓' : '☓'}</StyledSpan>;
};

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
        <ValidorNot success={errors.length} />, Klein- und Großbuchstaben
        <ValidorNot success={errors.lowerCase && errors.upperCase} />,
        mindestens eines dieser Sonderzeichen <code>{specialCharacters}</code>{' '}
        <ValidorNot success={errors.specialChar} /> und Zahlen{' '}
        <ValidorNot success={errors.digit} /> enthalten.
      </SmallParagraph>
    </>
  );
};
