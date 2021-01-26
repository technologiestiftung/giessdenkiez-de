import React, { FC, useEffect } from 'react';
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
import { StoreProps } from '../../common/interfaces';
import store from '../../state/Store';

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

const getUrlQueryParameter = (name = ''): string => {
  name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  const results = regex.exec(window.location.search);
  return results === null
    ? ''
    : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

type AppWrapperPropsType = Pick<
  StoreProps,
  'isTreeDataLoading' | 'isTreeMapLoading' | 'data' | 'overlay'
>;

const AppWrapper: FC<AppWrapperPropsType> = ({
  isTreeDataLoading,
  isTreeMapLoading,
  data,
  overlay: showOverlay,
}) => {
  const showLoading = isTreeMapLoading;
  const showMap = !isTreeDataLoading && data;
  const showMapUI = showMap && !showOverlay;

  useEffect(() => {
    if (isTreeMapLoading) return;
    const treeId = getUrlQueryParameter('location');
    store.setState({
      ...(treeId ? { highlightedObject: treeId } : {}),
      overlay: !treeId,
    });
    removeOverlay();
  }, [isTreeMapLoading]);

  return (
    <AppWrapperDiv>
      {showLoading && <Loading />}
      {showMap && <DeckGlMap data={data} />}
      {showMapUI && <Sidebar />}
      {showOverlay && <Overlay />}
      {showMapUI && <Nav />}
      <CreditsContainer>
        <Credits />
      </CreditsContainer>
      <CookieContainer>
        <Cookie />
      </CookieContainer>
      {showMapUI && <Legend />}
      <ImprintAndPrivacyContainer></ImprintAndPrivacyContainer>
    </AppWrapperDiv>
  );
};

export default AppWrapper;
