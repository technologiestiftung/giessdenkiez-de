import React from 'react';
import styled from 'styled-components';
import { connect } from 'unistore/react';
import Actions from '../../../state/Actions';

import SidebarLoadingCard from '../SidebarLoadingCard';

const SidebarAdopted = p => {
  const { selectedTreeState, adoptedTrees } = p;
  return (
    <>
      { (selectedTreeState === 'LOADING') && (
        <SidebarLoadingCard/>
      ) }
      { (adoptedTrees.length > 0) && (
        <ul>
          { adoptedTrees.map(tree => {
            <li>{tree.artDtsch}</li>
          }) }
        </ul>
      ) }
    </>
  )
}

export default connect(state => ({
  selectedTree: state.selectedTree,
  adoptedTrees: state.adoptedTrees,
}), Actions)(SidebarAdopted);