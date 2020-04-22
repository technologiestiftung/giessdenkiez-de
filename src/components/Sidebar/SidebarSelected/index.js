import React from 'react';
import styled from 'styled-components';
import { connect } from 'unistore/react';
import Actions from '../../../state/Actions';

import Card from '../../Card/';
import SidebarLoadingCard from '../SidebarLoadingCard';
import SidebarTitle from '../SidebarTitle';

const SidebarSelected = p => {
  const { selectedTreeState, selectedTree } = p;
  return (
    <>
      <SidebarTitle>Auswahl:</SidebarTitle>
      { (selectedTreeState === 'LOADING') && (
        <SidebarLoadingCard state={selectedTreeState}/>
      ) }

      { (selectedTree && selectedTreeState !== 'LOADING') && (
        <Card data={selectedTree}/>
      )}

    </>
  )
}

export default connect(state => ({
  selectedTree: state.selectedTree,
  selectedTreeState: state.selectedTreeState,
}), Actions)(SidebarSelected);