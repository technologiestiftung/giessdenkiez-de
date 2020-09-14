import React from 'react';
import styled from 'styled-components';
import Actions from '../../../state/Actions';
import { useStoreState, useActions } from '../../../state/unistore-hooks';
import { timeDifference, requests } from '../../../utils/index';

import SidebarLoadingCard from '../SidebarLoadingCard';
import CardWrapper from '../../Card/CardWrapper/';
import IconRemove from './IconRemove';
import SidebarTitle from '../SidebarTitle/';

import { colorByState } from '../../../assets/theme';

import store from '../../../state/Store';
import { useAuth0 } from '../../../utils/auth/auth0';
import { fetchAPI, createAPIUrl } from '../../../utils';

const StyledCardWrapper = styled(CardWrapper)`
  height: auto;
`;

const StyledTH = styled.th`
  text-align: left;
`;

interface StyledTDColorProps {
  state: any;
}

const StyledTDColor = styled.td<StyledTDColorProps>`
  color: ${p => colorByState(p.state)};
`;

const StyledTD = styled.td`
  cursor: pointer;
  padding: 5px 0;
`;

const StyledTableRow = styled.tr`
  opacity: 1;
  transition: opacity 0.125 ease-in-out;
  &:hover {
    opacity: 0.5;
    transition: opacity 0.125 ease-in-out;
  }
`;

const SidebarAdopted = () => {
  const { selectedTreeState } = useStoreState('selectedTreeState');
  const { adoptedTrees } = useStoreState('adoptedTrees');
  const { setDetailRouteWithListPath } = useActions(Actions);
  const { setViewport } = useActions(Actions);

  const { user, getTokenSilently } = useAuth0();

  const getTree = async tree => {
    const { id } = tree;

    const geometry = [Number(tree.lng), Number(tree.lat)];

    store.setState({ selectedTreeState: 'LOADING' });

    const url = createAPIUrl(store.getState(), `/get?&queryType=byid&id=${id}`);

    // TODO: Replace with requests
    fetchAPI(url)
      .then(r => {
        // ISSUE:141
        r.data.radolan_days = r.data.radolan_days.map(d => d / 10);
        r.data.radolan_sum = r.data.radolan_sum / 10;
        store.setState({ selectedTreeState: 'LOADED', selectedTree: r.data });
        setViewport(geometry);
        setDetailRouteWithListPath(id);
        return;
      })
      .catch(console.error);
  };

  // FIXME: Duplicate code appears also in
  // SidebarAdopted
  // TreesAdopted
  // ButtonAdopted
  // all three have a little bit different code
  const unadoptTree = async (id: string) => {
    try {
      store.setState({ selectedTreeState: 'ADOPT' });
      const token = await getTokenSilently();

      await requests(createAPIUrl(store.getState(), `/delete?id=${id}`), {
        token,
        override: {
          method: 'DELETE',
          body: JSON.stringify({
            tree_id: id,
            uuid: user.sub,
            queryType: 'unadopt',
          }),
        },
      });
      const jsonAdopted = await requests(
        createAPIUrl(
          store.getState(),
          `/get?queryType=adopted&uuid=${user.sub}`
        )
      );
      store.setState({
        selectedTreeState: 'FETCHED',
        adoptedTrees: jsonAdopted.data,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <>
      <SidebarTitle>Adoptierte Bäume:</SidebarTitle>
      {selectedTreeState !== 'FETCHED' && (
        <SidebarLoadingCard state={selectedTreeState} />
      )}
      {adoptedTrees.length > 0 && selectedTreeState === 'FETCHED' && (
        <StyledCardWrapper>
          <table>
            <thead>
              <tr>
                <StyledTH>Gattung</StyledTH>
                <StyledTH>Gegossen</StyledTH>
              </tr>
            </thead>
            <tbody>
              {adoptedTrees.map((tree, i) => {
                let watered = 'Keine Info';
                if (tree.watered) {
                  watered = tree.watered;
                }

                const timeDiff = timeDifference(+new Date(), watered);

                return (
                  <StyledTableRow key={`row-key-${i}`}>
                    <StyledTD
                      onClick={() => {
                        getTree(tree);
                      }}
                    >
                      {tree.artDtsch}
                    </StyledTD>
                    <StyledTDColor state={timeDiff[0]}>
                      {timeDiff[1]}
                    </StyledTDColor>
                    <StyledTD
                      onClick={() => {
                        unadoptTree(tree.id);
                      }}
                    >
                      <IconRemove />
                    </StyledTD>
                  </StyledTableRow>
                );
              })}
            </tbody>
          </table>
        </StyledCardWrapper>
      )}

      {adoptedTrees.length === 0 && selectedTreeState !== 'LOADING' && (
        <CardWrapper>Du hast noch keine Bäume adoptiert.</CardWrapper>
      )}
    </>
  );
};

export default SidebarAdopted;
