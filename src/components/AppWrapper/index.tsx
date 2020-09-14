import React from 'react';
import styled from 'styled-components';

import DeckGlMap from '../map';
import Sidebar from '../Sidebar';
import Nav from '../Nav';
import Legend from '../Legend/Legend';
import Cookie from '../Cookie';
import Loading from '../Loading';
import Overlay from '../Overlay';
import Credits from '../Credits';
import { ImprintAndPrivacyContainer } from '../imprint-and-privacy';

import { removeOverlay } from '../../utils';

const AppWrapperDiv = styled.div`
  font-family: ${(props: any) => props.theme.fontFamily};
  height: 100vh;
  width: 100vw;
`;

const CreditsContainer = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;

  @media screen and (max-width: ${p => p.theme.screens.tablet}) {
    display: none;
  }

  @media screen and (min-width: ${p => p.theme.screens.tablet}) {
    display: block;
  }
`;

const CookieContainer = styled.div`
  position: absolute;
  bottom: 12px;
  display: block;
  width: 60%;
  transform: translate(50%, 0%);
  right: 50%;

  @media screen and (max-width: ${p => p.theme.screens.mobile}) {
    width: 100%;
    bottom: 0px;
    z-index: 2;
  }
`;

const AppWrapper = p => {
  const { isLoading, data, overlay } = p;

  removeOverlay();

  return (
    <AppWrapperDiv>
      {isLoading && <Loading />}
      {!isLoading && data && <DeckGlMap data={data} />}
      {!isLoading && data && <Sidebar />}
      {overlay && data && <Overlay />}
      <Nav />
      <CreditsContainer>
        <Credits />
      </CreditsContainer>
      <CookieContainer>
        <Cookie />
      </CookieContainer>
      <Legend />
      <ImprintAndPrivacyContainer></ImprintAndPrivacyContainer>
    </AppWrapperDiv>
  );
};

export default AppWrapper;
