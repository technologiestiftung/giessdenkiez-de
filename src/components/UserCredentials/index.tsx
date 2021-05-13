import React, { FC, useRef } from 'react';
import styled from 'styled-components';
import ExpandablePanel from '../ExpandablePanel';
import SmallParagraph from '../SmallParagraph';

const CredentialValue = styled.p`
  display: block;
  font-size: ${p => p.theme.fontSizeL};
  margin: 0 0 4px;
`;

const CardCredentials: FC<{
  email: string,
  preferedUserName: string,
  changeUsername: (username: string) => Promise<void | undefined>;
}> = ({ email, preferedUserName, changeUsername }) => {
  const inputRef = useRef(null)
  return (
    <ExpandablePanel isExpanded title='Dein Account'>
      <SmallParagraph>Öffentlich angezeigter Benutzername:</SmallParagraph>
      <CredentialValue>
        <input
          ref={inputRef}
          onBlur={() => {
            if (inputRef.current?.value && inputRef.current?.value.length > 0 && inputRef.current?.value !== preferedUserName) {
              changeUsername(inputRef.current?.value)
            }
          }}
          placeholder="Benutzername"
          type="text"
          defaultValue={preferedUserName}
        />
      </CredentialValue>
      <SmallParagraph>Registrierte E-Mail Adresse:</SmallParagraph>
      <CredentialValue>{email}</CredentialValue>
    </ExpandablePanel>
  );
}

export default CardCredentials;