import React, {useState, useRef} from 'react';
import styled from 'styled-components';

import store from '../../../state/Store';
import { useAuth0 } from '../../../utils/auth/auth0';
import { requests } from '../../../utils/index';
import { createAPIUrl } from '../../../utils';
import CardDescription from '../CardDescription/';

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 0 20px 0;
  margin-bottom: 20px;
  border-bottom: 1px solid ${p => p.theme.colorGreyLight};
`;

const StyledCardHeadline = styled.div`
  margin-bottom: 10px;
  font-weight: bold;
`;

const StyledCardHeadlineMail = styled.div`
  font-size: 0.8rem;
`;

const CardCredentials = (p: { email: any; username: any }) => {
  const { email, username } = p;
  const { user, getTokenSilently } = useAuth0();
  const [usernameToUse, setUsernameToUse] = useState(username);
  const inputRef = useRef(null)


  const updateUsername = async (currentUser: any, preferedUserName: string) => {
    try {
      const token = await getTokenSilently();

      await requests(createAPIUrl(store.getState(), `/post`), {
        token,
        override: {
          method: 'POST',
          body: JSON.stringify({
            queryType: "user-profile",
            uuid: currentUser.sub,
            patches: [{
              "name": "prefered_username",
              "value": preferedUserName
            }]
          }),
        },
      });
      const user = store.getState().user;
      user.preferedUserName = preferedUserName;
      store.setState({ user });
      setUsernameToUse(preferedUserName);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };


  return (
    <Flex>
      <StyledCardHeadline>Dein Account:</StyledCardHeadline>
      { user.sub === "auth0|5f29bb0c53a5990037970148" ? (
        <StyledCardHeadlineMail>
          <input
            ref={inputRef}
            onBlur={() => inputRef.current?.value !== usernameToUse && updateUsername(user, inputRef.current?.value)}
            placeholder="Benutzername"
            type="text"
            value={usernameToUse}
          />
        </StyledCardHeadlineMail>
      ) : (
        <StyledCardHeadlineMail>{username}</StyledCardHeadlineMail>
      )}
      <CardDescription>Für alle sichtbarer Benutzername</CardDescription>
      <StyledCardHeadlineMail>{email}</StyledCardHeadlineMail>
      <CardDescription>Registrierte E-Mail Adresse</CardDescription>
    </Flex>
  );
};

export default CardCredentials;
