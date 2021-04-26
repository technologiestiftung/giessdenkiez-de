import React, { FC } from 'react';
import styled from 'styled-components';
import { hot } from 'react-hot-loader/root';
import { useLocation } from 'react-router';

import { Map } from '../TreesMap';
import Sidebar from '../Sidebar';
import Nav from '../Nav';
import MapLayerLegend from '../Legend/MapLayersLegend';
import Cookie from '../Cookie';
import Loading from '../Loading';
import Overlay from '../Overlay';
import Credits from '../Credits';
import { ImprintAndPrivacy } from '../ImprintAndPrivacy';
import { useStoreState } from '../../state/unistore-hooks';
import { useCommunityData } from '../../utils/hooks/useCommunityData';
import { useRainGeoJson } from '../../utils/hooks/useRainGeoJson';
import { usePumpsGeoJson } from '../../utils/hooks/usePumpsGeoJson';
import { useTreesGeoJson } from '../../utils/hooks/useTreesGeoJson';

const AppContainer = styled.div`
  font-family: ${({ theme: { fontFamily } }): string => fontFamily};
  height: 100vh;
  width: 100vw;
`;

const ImprintAndPrivacyContainer = styled.div`
  position: fixed;
  bottom: 7px;
  right: 16px;
  width: auto;
  height: 24px;
  z-index: 2;
`;

const App: FC = () => {
  const overlay = useStoreState('overlay');
  const isNavOpen = useStoreState('isNavOpen');

  const { data: communityData } = useCommunityData();
  const { data: rainGeoJson } = useRainGeoJson();
  const { data: pumpsGeoJson } = usePumpsGeoJson();
  const { data: treesGeoJson } = useTreesGeoJson();
  const { pathname } = useLocation();

  const isHome = pathname === '/';
  const showOverlay = isHome && overlay;
  const showMap = Boolean(
    treesGeoJson && communityData && rainGeoJson && pumpsGeoJson
  );
  const showLoading = !showMap;
  const showMapUI = showMap && !showOverlay;
  const isSidebarOpened = !isHome && isNavOpen;

  return (
    <AppContainer>
      {showLoading && <Loading />}
      {showMap && (
        <Map isNavOpened={isSidebarOpened} showOverlay={showOverlay} />
      )}
      {showMapUI && <Sidebar />}
      {showOverlay && <Overlay />}
      {showMapUI && <Nav isNavOpened={!isHome} />}
      <Credits />
      <Cookie />
      {showMapUI && <MapLayerLegend />}
      <ImprintAndPrivacyContainer>
        <ImprintAndPrivacy />
      </ImprintAndPrivacyContainer>
    </AppContainer>
  );
};

export default hot(App);
