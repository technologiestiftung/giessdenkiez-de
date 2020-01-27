import React from 'react';
import styled from 'styled-components';
import { connect } from 'unistore/react';
import Actions from '../../../state/Actions';
import { convertTime } from '../../../utils/index'

import SidebarLoadingCard from '../SidebarLoadingCard';
import CardWrapper from '../../Card/CardWrapper/';

const SidebarAdopted = p => {
  const { selectedTreeState, adoptedTrees } = p;
  console.log(adoptedTrees, selectedTreeState);
  return (
    <>
      { (selectedTreeState === 'LOADING') && (
        <SidebarLoadingCard state={selectedTreeState}/>
      ) }
      { (adoptedTrees.length > 0) && (selectedTreeState === 'FETCHED') && (
        <CardWrapper>
          <table>
            <thead>
              <tr>
                  <th>Gattung</th>
                  <th>Gegossen</th>
              </tr>
            </thead>
            <tbody>
              { adoptedTrees.map(tree => {
                let watered = 'Keine Info';
                if (tree.watered) {
                  watered = tree.watered;
                }
                return (
                  <tr>
                    <td>{tree.artDtsch}</td>
                    <td>{watered}</td>
                  </tr>
                )
              }) }
            </tbody>
          </table>
        </CardWrapper>
      )}

    </>
  )
}

export default connect(state => ({
  selectedTree: state.selectedTree,
  selectedTreeState: state.selectedTreeState,
  adoptedTrees: state.adoptedTrees,
}), Actions)(SidebarAdopted);