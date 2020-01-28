import React from 'react';
import styled from 'styled-components';
import { connect } from 'unistore/react';
import Actions from '../../../state/Actions';
import { convertTime } from '../../../utils/index'

import SidebarLoadingCard from '../SidebarLoadingCard';
import CardWrapper from '../../Card/CardWrapper/';
import IconRemove from './IconRemove';
import SidebarTitle from '../SidebarTitle/';

import Store from '../../../state/Store';
import { useAuth0 } from "../../../utils/auth0";
import { fetchAPI, createAPIUrl } from '../../../state/utils';

const StyledTH = styled.th`
  text-align: left;
`;

const StyledTableRow = styled.tr`
  opacity: 1;
  transition: opacity .125 ease-in-out;
  &:hover {
    opacity: .5;
    transition: opacity .125 ease-in-out;
  }
`;

const SidebarAdopted = p => {
  const { selectedTreeState, adoptedTrees, state, setDetailRouteWithListPath } = p;
  const { loading, user, isAuthenticated, getTokenSilently } = useAuth0();

  const getTree = async (id) => {
    Store.setState({ selectedTreeState: 'LOADING' });

    const url = createAPIUrl(state, `/get-tree?id=${id}`);

    const res = fetchAPI(url)
      .then(r => { 
        Store.setState({ selectedTreeState: 'LOADED', selectedTree: r.data });
        setDetailRouteWithListPath(id);
      });
  }

  const unadoptTree = async (id) => {
      Store.setState({ selectedTreeState: 'ADOPT' });
      const token = await getTokenSilently();
      const url = createAPIUrl(state, `/private/unadopt-tree?id=${id}`);
      const header = {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }

      const res = await fetchAPI(url, header)
        .then(r => {
          const url = createAPIUrl(state, `/private/get-adopted-trees?mail=${user.email}`);
          const res = fetchAPI(url, header)
            .then(r => {
              Store.setState({ selectedTreeState: 'FETCHED', adoptedTrees: r.data.adopted }); 
              });
          })
  }


  return (
    <>
      <SidebarTitle>Abonnierte Bäume:</SidebarTitle>
      { (selectedTreeState !== 'FETCHED') && (
        <SidebarLoadingCard state={selectedTreeState}/>
      ) }
      { (adoptedTrees.length > 0) && (selectedTreeState === 'FETCHED') && (
        <CardWrapper>
          <table>
            <thead>
              <tr>
                  <StyledTH>Gattung</StyledTH>
                  <StyledTH>Gegossen</StyledTH>
              </tr>
            </thead>
            <tbody>
              { adoptedTrees.map(tree => {
                console.log(tree);
                let watered = 'Keine Info';
                if (tree.watered) {
                  watered = tree.watered;
                }
                return (
                  <StyledTableRow
                    onClick={() => { getTree(tree.id) }}
                  >
                    <td>{tree.artDtsch}</td>
                    <td>{watered}</td>
                    <td onClick={(e) => { unadoptTree(tree.id) }}><IconRemove/></td>
                  </StyledTableRow>
                )
              }) }
            </tbody>
          </table>
        </CardWrapper>
      )}

      { (adoptedTrees.length == 0) && (selectedTreeState !== 'LOADING') && (
        <CardWrapper>
          Du hast noch keine Bäume abonniert.
        </CardWrapper>
      )}

    </>
  )
}

export default connect(state => ({
  selectedTree: state.selectedTree,
  selectedTreeState: state.selectedTreeState,
  adoptedTrees: state.adoptedTrees,
  state: state
}), Actions)(SidebarAdopted);