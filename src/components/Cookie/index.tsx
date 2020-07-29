import React from 'react';
import styled from 'styled-components';
import store from '../../state/Store';

import Actions from '../../state/Actions';
import { connect } from 'unistore/react';

import ButtonRound from '../ButtonRound/';

const CookieDiv = styled.div`
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

const StyledCardDescription = styled.div`
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

const Cookie = p => {
  const { cookiesAccepted } = p;

  const setCookie = () => {
    document.cookie = 'disclaimerAccepted=true;path=/;';
    store.setState({ cookiesAccepted: true });
  };

  return (
    <>
      {!cookiesAccepted && (
        <CookieDiv>
          <Inner>
            <StyledCardDescription>
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
            </StyledCardDescription>
            <ButtonRound
              width='fit-content'
              fontSize={'.8rem'}
              toggle={() => setCookie()}
            >
              Einverstanden
            </ButtonRound>
          </Inner>
        </CookieDiv>
      )}
    </>
  );
};

export default connect(
  state => ({
    cookiesAccepted: state.cookiesAccepted,
  }),
  Actions
)(Cookie);
