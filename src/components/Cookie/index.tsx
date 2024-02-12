import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

import ButtonRound from '../ButtonRound';
import { areCookiesAccepted } from '../../utils/areCookiesAccepted';
import { StyledComponentType } from '../../common/interfaces';
import useLocalizedContent from '../../utils/hooks/useLocalizedContent';

const CookieWrapper = styled.div<StyledComponentType>`
  z-index: 1;
  font-size: 12px;
  box-shadow: ${p => p.theme.boxShadow};
  height: min-content;
  width: auto;
  background: white;
`;

const Inner = styled.div<StyledComponentType>`
  display: grid;
  align-items: center;
  padding: 10px;
  grid-column-gap: 24px;
  grid-template-columns: 1fr auto auto;

  @media screen and (max-width: ${p =>
      p.theme.screens.laptop}) and (min-width: ${p => p.theme.screens.mobile}) {
    grid-template-columns: 1fr auto;
    grid-row-gap: 8px;
  }

  @media screen and (max-width: ${p => p.theme.screens.mobile}) {
    grid-template-columns: 1fr 1fr;
    padding: 24px;
    justify-items: flex-end;
  }
`;

const MoreInfoLink = styled.a<StyledComponentType>`
  color: ${p => p.theme.colorTextLight};
  text-decoration: underline;
  white-space: nowrap;

  @media screen and (max-width: ${p => p.theme.screens.tablet}) {
    justify-self: flex-start;
  }
`;

const Text = styled.p<StyledComponentType>`
  line-height: 150%;
  opacity: 0.66;
  margin: 0;
  grid-row: span 2;

  a {
    color: ${p => p.theme.colorTextDark};
    &:hover {
      opacity: 0.33;
    }
  }

  @media screen and (max-width: ${p =>
      p.theme.screens.laptop}) and (min-width: ${p => p.theme.screens.mobile}) {
    grid-row: span 2;
  }

  @media screen and (max-width: ${p => p.theme.screens.mobile}) {
    grid-column: span 2;
    a {
      display: block;
    }
  }
`;

const CookieContainer = styled.div<StyledComponentType>`
  position: absolute;
  bottom: 12px;
  display: block;
  width: 100%;
  max-width: 1000px;
  transform: translate(50%, 0%);
  right: 50%;
  z-index: 3;

  @media screen and (max-width: ${p => p.theme.screens.tablet}) {
    width: 100%;
    bottom: 0px;
  }
`;

const Cookie: FC = () => {
  const content = useLocalizedContent();

  const [cookiesAccepted, setCookieAccepted] = useState<boolean>(false);

  const setCookie = () => {
    document.cookie = 'disclaimerAccepted=true;path=/;';

    setCookieAccepted(true);
  };

  useEffect(() => {
    const cookieAreAccepted = areCookiesAccepted('disclaimerAccepted');
    setCookieAccepted(cookieAreAccepted);
  }, []);

  return (
    <CookieContainer>
      {!cookiesAccepted && (
        <CookieWrapper>
          <Inner>
            <Text>{content.cookies.disclaimer} </Text>
            <MoreInfoLink
              href='https://www.technologiestiftung-berlin.de/de/datenschutz/'
              target='_blank'
              rel='noopener noreferrer'
            >
              {content.cookies.info}
            </MoreInfoLink>
            <ButtonRound
              width='fit-content'
              fontSize={'.8rem'}
              onClick={() => setCookie()}
            >
              {content.cookies.accept}
            </ButtonRound>
          </Inner>
        </CookieWrapper>
      )}
    </CookieContainer>
  );
};

export default Cookie;
