import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';

import DeckGlMap from '../map';
import Sidebar from '../Sidebar';
import Nav from '../Nav';
import MapLayerLegend from '../Legend/MapLayersLegend';
import Cookie from '../Cookie';
import Loading from '../Loading';
import Overlay from '../Overlay';
import Credits from '../Credits';
import { getLayers } from '../Layer';
import { ImprintAndPrivacyContainer } from '../imprint-and-privacy';
import { useStoreState } from '../../state/unistore-hooks';
import { useTreeData } from '../../utils/hooks/useTreeData';
import { useHistory, useLocation } from 'react-router';
import { useCurrentTreeId } from '../../utils/hooks/useCurrentTreeId';
import { useCommunityData } from '../../utils/hooks/useCommunityData';
import { useRainGeoJson } from '../../utils/hooks/useRainGeoJson';
import { usePumpsGeoJson } from '../../utils/hooks/usePumpsGeoJson';
import { useTreesGeoJson } from '../../utils/hooks/useTreesGeoJson';
import { OnViewStateChange } from '../../common/types';
import { HoveredPump, ViewState } from '../../common/interfaces';
import NewMap from '../newMap';

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
  const visibleMapLayer = useStoreState('visibleMapLayer');
  const ageRange = useStoreState('ageRange');
  const mapViewFilter = useStoreState('mapViewFilter');

  const treeId = useCurrentTreeId();
  const { data: communityData } = useCommunityData();
  const { data: rainGeoJson } = useRainGeoJson();
  const { data: pumpsGeoJson } = usePumpsGeoJson();
  const { data: treesGeoJson } = useTreesGeoJson();
  const { treeData: selectedTreeData } = useTreeData(treeId);
  const history = useHistory();

  return (
    <DeckGlMap
      onTreeSelect={(id: string) => {
        const nextLocation = `/tree/${id}`;
        history.push(nextLocation);
      }}
      treesGeoJson={treesGeoJson || null}
      rainGeojson={rainGeoJson || null}
      visibleMapLayer={visibleMapLayer}
      isNavOpen={!!isNavOpened}
      showControls={showOverlay}
      pumpsGeoJson={pumpsGeoJson || null}
      ageRange={ageRange || []}
      mapViewFilter={mapViewFilter}
      communityData={communityData?.communityFlagsMap || null}
      communityDataWatered={communityData?.wateredTreesIds || []}
      communityDataAdopted={communityData?.adoptedTreesIds || []}
      selectedTreeId={treeId || undefined}
      selectedTreeData={selectedTreeData}
    />
  );
};

const initialViewState: ViewState = {
  bearing: 0,
  latitude: 52.500869,
  longitude: 13.419047,
  maxZoom: 19,
  minZoom: 9,
  pitch: 45,
  zoom: 11,
};

const NewMapWrapper: FC = () => {
  const visibleMapLayer = useStoreState('visibleMapLayer');
  const ageRange = useStoreState('ageRange');

  const [viewState, setViewState] = useState<ViewState>(initialViewState);
  const [selectedTree, setSelectedTree] = useState<string>('');
  const [hoveredPump, setHoveredPump] = useState<HoveredPump | null>(null);

  const { data: communityData } = useCommunityData();
  const { data: rain } = useRainGeoJson();
  const { data: pumps } = usePumpsGeoJson();
  const { data: trees } = useTreesGeoJson();

  const onViewStateChange: OnViewStateChange = newViewState =>
    setViewState({ ...viewState, ...newViewState });

  const layers = getLayers({
    isMobile,
    visibleMapLayer,
    onViewStateChange,
    selectedTree,
    setSelectedTree,
    setHoveredPump,
    ageRange,
    data: {
      communityData,
      rain,
      pumps,
      trees,
    },
  });
  return (
    <NewMap
      mapboxApiAccessToken={process.env.API_KEY}
      layers={layers}
      viewState={viewState}
      onViewStateChange={onViewStateChange}
    />
  );
};

const AppWrapper: FC = () => {
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
    <AppWrapperDiv>
      {showLoading && <Loading />}
      {showMap && (
        // <Map isNavOpened={isSidebarOpened} showOverlay={showOverlay} />
        <NewMapWrapper />
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
