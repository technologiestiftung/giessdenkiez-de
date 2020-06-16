import React from 'react';
import styled from 'styled-components';
import { connect } from 'unistore/react';
import Actions from '../../../state/Actions';

import SidebarTitle from '../SidebarTitle/';
import Card from '../../Card/';
import CardLegend from '../../Card/CardLegend/';
import LoadingIcon from '../../LoadingIcon/';

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 125px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SidebarSearch = p => {
  const { selectedTree, selectedTreeState } = p;
  return (
    <>
      <SidebarTitle>Suche & Filter</SidebarTitle>
      {selectedTreeState === 'LOADING' && (
        <Container>
          <LoadingIcon text='Lade Baum ...' />
        </Container>
      )}
      {selectedTree && selectedTreeState !== 'LOADING' && (
        //@ts-ignore
        <Card data={selectedTree} />
      )}
      {!selectedTree && selectedTreeState !== 'LOADING' && <CardLegend />}
    </>
  );
};

export default connect(
  state => ({
    selectedTree: state.selectedTree,
    selectedTreeState: state.selectedTreeState,
  }),
  Actions
)(SidebarSearch);
