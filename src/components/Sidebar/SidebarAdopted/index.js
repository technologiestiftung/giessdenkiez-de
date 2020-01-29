import React from 'react';
import styled from 'styled-components';
import { connect } from 'unistore/react';
import Actions from '../../../state/Actions';
import { convertTime, timeDifference } from '../../../utils/index'

import SidebarLoadingCard from '../SidebarLoadingCard';
import CardWrapper from '../../Card/CardWrapper/';
import IconRemove from './IconRemove';
import SidebarTitle from '../SidebarTitle/';

import { colorByState } from '../../../assets/theme';

import Store from '../../../state/Store';
import { useAuth0 } from "../../../utils/auth0";
import { fetchAPI, createAPIUrl } from '../../../state/utils';

const StyledTH = styled.th`
  text-align: left;
`;

const StyledTDColor = styled.td`
  color: ${ p => colorByState(p.state) }
`;

const StyledTD = styled.td`
  cursor: pointer;
  padding: 5px 0;
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
  const { selectedTreeState, adoptedTrees, state, setDetailRouteWithListPath, setViewport } = p;
  const { loading, user, isAuthenticated, getTokenSilently } = useAuth0();

  const getTree = async (tree) => {
    const { id } = tree;

    const geometry = [Number(tree.lat), Number(tree.lng)];

    Store.setState({ selectedTreeState: 'LOADING' });

    const url = createAPIUrl(state, `/get-tree?id=${id}`);

    const res = fetchAPI(url)
      .then(r => {
        Store.setState({ selectedTreeState: 'LOADED', selectedTree: r.data });
        setViewport(geometry);
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
              { adoptedTrees.map((tree, i) => {
                let watered = 'Keine Info';
                if (tree.watered) {
                  watered = tree.watered;
                }

                const timeDiff = timeDifference(+ new Date(), watered);

                return (
                  <StyledTableRow key={`row-key-${i}`}>
                    <StyledTD onClick={() => { getTree(tree) }}>{tree.artDtsch}</StyledTD>
                    <StyledTDColor   state={timeDiff[0]}>{timeDiff[1]}</StyledTDColor >
                    <StyledTD onClick={(e) => { unadoptTree(tree.id) }}><IconRemove/></StyledTD>
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