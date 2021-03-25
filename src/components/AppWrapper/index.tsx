import React, { FC } from 'react';
import styled from 'styled-components';

import DeckGlMap from '../map';
import Sidebar from '../Sidebar';
import Nav from '../Nav';
import MapLayerLegend from '../Legend/MapLayersLegend';
import Cookie from '../Cookie';
import Loading from '../Loading';
import Overlay from '../Overlay';
import Credits from '../Credits';
import { ImprintAndPrivacyContainer } from '../imprint-and-privacy';
import { useStoreState } from '../../state/unistore-hooks';
import { useTreeData } from '../../utils/hooks/useTreeData';
import { useHistory, useLocation } from 'react-router';
import { useCurrentTreeId } from '../../utils/hooks/useCurrentTreeId';
import { useCommunityData } from '../../utils/hooks/useCommunityData';
import { useRainGeoJson } from '../../utils/hooks/useRainGeoJson';

const AppWrapperDiv = styled.div`
  font-family: ${({ theme: { fontFamily } }): string => fontFamily};
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
  z-index: 3;

  @media screen and (max-width: ${p => p.theme.screens.mobile}) {
    width: 100%;
    bottom: 0px;
  }
`;

const Map: FC<{
  showOverlay: boolean | undefined;
  isNavOpened: boolean | undefined;
}> = ({ showOverlay, isNavOpened }) => {
  const data = useStoreState('data');
  const visibleMapLayer = useStoreState('visibleMapLayer');
  const ageRange = useStoreState('ageRange');
  const mapViewFilter = useStoreState('mapViewFilter');
  const wateredTrees = useStoreState('wateredTrees');
  const isTreeDataLoading = useStoreState('isTreeDataLoading');

  const treeId = useCurrentTreeId();
  const { data: communityData } = useCommunityData();
  const { data: rainGeoJson } = useRainGeoJson();
  const { data: pumpsGeoJson } = useRainGeoJson();
  const { treeData: selectedTreeData } = useTreeData(treeId);
  const history = useHistory();

  return (
    <DeckGlMap
      onTreeSelect={(id: string) => {
        const nextLocation = `/tree/${id}`;
        history.push(nextLocation);
      }}
      data={data || null}
      rainGeojson={rainGeoJson || null}
      visibleMapLayer={visibleMapLayer}
      isTreeDataLoading={Boolean(isTreeDataLoading && rainGeoJson)}
      isNavOpen={!!isNavOpened}
      showControls={showOverlay}
      pumps={pumpsGeoJson || null}
      ageRange={ageRange || []}
      mapViewFilter={mapViewFilter}
      communityData={communityData?.communityFlagsMap || null}
      wateredTrees={wateredTrees || []}
      communityDataWatered={communityData?.wateredTreesIds || []}
      communityDataAdopted={communityData?.adoptedTreesIds || []}
      selectedTreeId={treeId || undefined}
      selectedTreeData={selectedTreeData}
    />
  );
};

const AppWrapper: FC = () => {
  const isTreeDataLoading = useStoreState('isTreeDataLoading');
  const data = useStoreState('data');
  const overlay = useStoreState('overlay');
  const isNavOpen = useStoreState('isNavOpen');
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const showOverlay = isHome && overlay;

  const showMap = !isTreeDataLoading && data;
  const showLoading = !showMap;
  const showMapUI = showMap && !showOverlay;
  const isSidebarOpened = !isHome && isNavOpen;

  return (
    <AppWrapperDiv>
      {showLoading && <Loading />}
      {showMap && (
        <Map isNavOpened={isSidebarOpened} showOverlay={showOverlay} />
      )}
      {showMapUI && <Sidebar />}
      {showOverlay && <Overlay />}
      {showMapUI && <Nav isNavOpened={!isHome} />}
      <CreditsContainer>
        <Credits />
      </CreditsContainer>
      <CookieContainer>
        <Cookie />
      </CookieContainer>
      {showMapUI && <MapLayerLegend />}
      <ImprintAndPrivacyContainer></ImprintAndPrivacyContainer>
    </AppWrapperDiv>
  );
};

export default AppWrapper;
