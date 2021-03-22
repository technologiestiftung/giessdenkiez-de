import React, { FC } from 'react';
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
import { useActions, useStoreState } from '../../state/unistore-hooks';
import { getTreeData } from '../../utils/requests/getTreeData';
import { StoreProps } from '../../common/interfaces';

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

const Map: FC = () => {
  const data = useStoreState('data');
  const rainGeojson = useStoreState('rainGeojson');
  const treesVisible = useStoreState('treesVisible');
  const pumpsVisible = useStoreState('pumpsVisible');
  const rainVisible = useStoreState('rainVisible');
  const pumps = useStoreState('pumps');
  const ageRange = useStoreState('ageRange');
  const dataView = useStoreState('dataView');
  const communityData = useStoreState('communityData');
  const wateredTrees = useStoreState('wateredTrees');
  const communityDataWatered = useStoreState('communityDataWatered');
  const communityDataAdopted = useStoreState('communityDataAdopted');
  const isTreeDataLoading = useStoreState('isTreeDataLoading');
  const isNavOpen = useStoreState('isNavOpen');
  const overlay = useStoreState('overlay');
  const selectedTreeId = useStoreState('selectedTreeId');
  const { selectTree, setSelectedTreeData } = useActions();

  return (
    <DeckGlMap
      onTreeSelect={async (
        treeId: string
      ): Promise<StoreProps['selectedTreeData']> => {
        selectTree(treeId);
        const treeData = await getTreeData(treeId);
        const { selectedTreeData } = treeData;
        setSelectedTreeData(selectedTreeData);
        return selectedTreeData;
      }}
      data={data || null}
      rainGeojson={rainGeojson || null}
      treesVisible={!!treesVisible}
      pumpsVisible={!!pumpsVisible}
      rainVisible={!!rainVisible}
      isTreeDataLoading={!!isTreeDataLoading}
      isNavOpen={!!isNavOpen}
      overlay={!!overlay}
      pumps={pumps || null}
      ageRange={ageRange || []}
      dataView={dataView || 'watered'}
      communityData={communityData || null}
      wateredTrees={wateredTrees || []}
      communityDataWatered={communityDataWatered || []}
      communityDataAdopted={communityDataAdopted || []}
      selectedTreeId={selectedTreeId}
    />
  );
};

const AppWrapper: FC = () => {
  const isTreeDataLoading = useStoreState('isTreeDataLoading');
  const data = useStoreState('data');
  const showOverlay = useStoreState('overlay');

  const showMap = !isTreeDataLoading && data;
  const showLoading = !showMap;
  const showMapUI = showMap && !showOverlay;

  return (
    <AppWrapperDiv>
      {showLoading && <Loading />}
      {showMap && <Map />}
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
