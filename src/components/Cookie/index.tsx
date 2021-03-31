import React, { FC, useState } from 'react';
import styled from 'styled-components';

import ButtonRound from '../ButtonRound';
import { areCookiesAccepted } from '../../utils/areCookiesAccepted';

const cookieAreAccepted = areCookiesAccepted('disclaimerAccepted');

const CookieWrapper = styled.div`
  z-index: 1;
  font-size: 12px;
  box-shadow: ${p => p.theme.boxShadow};
  height: min-content;
  width: auto;
  background: white;
`;

const Inner = styled.div`
  flex-direction: row;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  justify-content: space-between;
  padding: 10px;
`;

const Text = styled.p`
  line-height: 150%;
  opacity: 0.66;

  a {
    color: ${p => p.theme.colorTextDark};
    &:hover {
      opacity: 0.33;
    }
  }

  @media screen and (max-width: 600px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;

const CookieContainer = styled.div`
  position: absolute;
  bottom: 12px;
  display: block;
  width: 60%;
  transform: translate(50%, 0%);
  right: 50%;
  z-index: 3;

  @media screen and (max-width: ${p => p.theme.screens.mobile}) {
    width: 100%;
    bottom: 0px;
  }
`;

const Cookie: FC = () => {
  const [cookiesAccepted, setCookieAccepted] = useState<boolean>(
    cookieAreAccepted
  );

  const setCookie = () => {
    document.cookie = 'disclaimerAccepted=true;path=/;';
    setCookieAccepted(true);
  };

  return (
    <CookieContainer>
      {!cookiesAccepted && (
        <CookieWrapper>
          <Inner>
            <Text>
              Diese Webseite verwendet Cookies, um bestimmte Funktionen zu
              ermöglichen und das Angebot zu verbessern. Indem du hier
              fortfährst stimmst du der Nutzung von Cookies zu.{' '}
              <a
                href='https://www.technologiestiftung-berlin.de/de/datenschutz/'
                target='_blank'
                rel='noopener noreferrer'
              >
                Weitere Informationen.
              </a>
            </Text>
            <ButtonRound
              width='fit-content'
              fontSize={'.8rem'}
              onClick={() => setCookie()}
            >
              Einverstanden
            </ButtonRound>
          </Inner>
        </CookieWrapper>
      )}
    </CookieContainer>
  );
};

export default Cookie;
