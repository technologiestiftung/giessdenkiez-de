import React from 'react';
import styled from 'styled-components';
import { connect } from 'unistore/react';
import Actions from '../../../state/Actions';
import { timeDifference, requests } from '../../../utils/index';

import SidebarLoadingCard from '../SidebarLoadingCard';
import CardWrapper from '../../Card/CardWrapper/';
import IconRemove from './IconRemove';
import SidebarTitle from '../SidebarTitle/';

import { colorByState } from '../../../assets/theme';

import store from '../../../state/Store';
import { useAuth0 } from '../../../utils/auth0';
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

const SidebarAdopted = p => {
  const {
    selectedTreeState,
    adoptedTrees,
    state,
    setDetailRouteWithListPath,
    setViewport,
  } = p;
  const { user, getTokenSilently } = useAuth0();

  const getTree = async tree => {
    const { id } = tree;

    const geometry = [Number(tree.lng), Number(tree.lat)];

    store.setState({ selectedTreeState: 'LOADING' });

    const url = createAPIUrl(state, `/get?&queryType=byid&id=${id}`);

    fetchAPI(url)
      .then(r => {
        // ISSUE:141
        //@ts-ignore

        r.data.radolan_days = r.data.radolan_days.map(d => d / 10);
        //@ts-ignore
        r.data.radolan_sum = r.data.radolan_sum / 10;
        //@ts-ignore
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
      // const urlDel = createAPIUrl(state, `/delete?id=${id}`);
      // const header = {
      //   headers: {
      //     Authorization: 'Bearer ' + token,
      //   },
      // };

      /* TODO: replace URL */
      console.log(user);

      await requests(createAPIUrl(state, `/delete?id=${id}`), {
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
        createAPIUrl(state, `/get?queryType=adopted&uuid=${user.sub}`)
      );
      store.setState({
        selectedTreeState: 'FETCHED',
        //@ts-ignore
        adoptedTrees: jsonAdopted.data,
      });
      // await fetchAPI(url, header)
      //   .then(r => {
      // const url = createAPIUrl(
      //   state,
      //   `/private/get-adopted-trees?mail=${user.email}`
      // );
      // TODO: Avoid nesting promises. eslintpromise/no-nesting
      // fetchAPI(url, header)
      //   .then(r => {
      //     store.setState({
      //       selectedTreeState: 'FETCHED',
      //       //@ts-ignore
      //       adoptedTrees: r.data.adopted,
      //     });
      //     return;
      //   })
      //   .catch(console.error);
      //   return;
      // })
      // .catch(console.error);
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
                      onClick={e => {
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

export default connect(
  state => ({
    selectedTree: state.selectedTree,
    selectedTreeState: state.selectedTreeState,
    adoptedTrees: state.adoptedTrees,
    state: state,
  }),
  Actions
)(SidebarAdopted);
