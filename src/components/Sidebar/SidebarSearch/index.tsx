import React from 'react';
import styled from 'styled-components';
// import { connect } from 'unistore/react';
// import Actions from '../../../state/Actions';
import { useStoreState } from '../../../state/unistore-hooks';
import SidebarTitle from '../SidebarTitle/';
import Card from '../../Card/Card';
import CardLegend from '../../Card/CardLegend/';
import LoadingIcon from '../../LoadingIcon/';

const Container = styled.div`
  width: 100%;
  height: calc(60vh - 125px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SidebarSearch = () => {
  const { selectedTree } = useStoreState('selectedTree');
  const { selectedTreeState } = useStoreState('selectedTreeState');

  return (
    <>
      <SidebarTitle>Suche & Filter</SidebarTitle>
      {selectedTreeState === 'LOADING' && (
        <Container>
          <LoadingIcon text='Lade Baum ...' />
        </Container>
      )}
      {selectedTree === undefined && selectedTreeState === 'NOT_FOUND' && (
        <Container>
          <LoadingIcon text='Baumdaten nicht gefunden. Probier einen anderen ...' />
        </Container>
      )}
      {selectedTree && selectedTreeState !== 'LOADING' && (
        <Card data={selectedTree} />
      )}
      {!selectedTree && selectedTreeState !== 'LOADING' && <CardLegend />}
    </>
  );
};

export default SidebarSearch;
