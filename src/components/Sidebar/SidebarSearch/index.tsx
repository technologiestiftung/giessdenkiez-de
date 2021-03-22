import React, { FC } from 'react';
import styled from 'styled-components';
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

const SidebarSearch: FC = () => {
  const { selectedTreeId } = useStoreState('selectedTree');
  const { selectedTreeState } = useStoreState('selectedTreeState');

  return (
    <>
      <SidebarTitle>Suche & Filter</SidebarTitle>
      {selectedTreeState === 'LOADING' && (
        <Container>
          <LoadingIcon text='Lade Baum ...' />
        </Container>
      )}
      {selectedTreeId === undefined && selectedTreeState === 'NOT_FOUND' && (
        <Container>
          <LoadingIcon text='Baumdaten nicht gefunden. Probier einen anderen ...' />
        </Container>
      )}
      {selectedTreeId && selectedTreeState !== 'LOADING' && <Card />}
      {!selectedTreeId && selectedTreeState !== 'LOADING' && <CardLegend />}
    </>
  );
};

export default SidebarSearch;
