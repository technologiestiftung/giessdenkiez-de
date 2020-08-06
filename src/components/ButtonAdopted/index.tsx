import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'unistore/react';
import store from '../../state/Store';
import Actions from '../../state/Actions';
import { useAuth0 } from '../../utils/auth/auth0';
import { createAPIUrl, requests, isTreeAdopted } from '../../utils';

const colorText: (p: any) => string = p => p.theme.colorTextDark;
const StyledButtonAdopted = styled.div`
  font-size: 12px;
  border: 1px solid ${colorText};
  width: 75px;
  border-radius: 100px;
  display: flex;
  padding: 4px 5px 6px 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  transition: 0.125s opacity ease-in-out;
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    transition: 0.125s opacity ease-in-out;
    background: ${colorText};
    color: white;

    svg {
      transition: 0.125s opacity ease-in-out;
      fill: white;
    }
  }

  svg {
    width: 0.75em;
    height: 0.75em;
    transition: 0.125s opacity ease-in-out;
  }
`;

const Label = styled.span``;

const ButtonAdopted = p => {
  const { getTokenSilently, isAuthenticated } = useAuth0();
  const { selectedTree, state, user } = p;
  const [unadopting, setUnadopting] = useState(false);
  // let isMounted = true;
  useEffect(() => {
    return () => {
      // isMounted = false;
    };
  });
  // FIXME: Duplicate code appears also in
  // SidebarAdopted
  // TreesAdopted
  // ButtonAdopted
  // all three have a little bit different code

  const unadoptTree: (id: string) => Promise<void> = async id => {
    try {
      store.setState({ selectedTreeState: 'ADOPT' });
      const token = await getTokenSilently();
      // const header = {
      //   headers: {
      //     Authorization: 'Bearer ' + token,
      //   },
      // };

      const urlUnadopt = createAPIUrl(
        state,
        '/delete'
        // `/private/unadopt-tree?tree_id=${id}&uuid=${user.user_id}`
      );
      const urlAdoptedTrees = createAPIUrl(
        store.getState(),
        `/get?queryType=adopted&uuid=${user.user_id}`
        // `/private/get-adopted-trees?uuid=${user.user_id}`
      );
      setUnadopting(true);

      /* TODO: replace URL */
      // await fetchAPI(urlUnadopt, header);
      await requests(urlUnadopt, {
        token,
        override: {
          method: 'DELETE',
          body: JSON.stringify({
            uuid: user.user_id,
            // eslint-disable-next-line @typescript-eslint/camelcase
            tree_id: id,
            queryType: 'unadopt',
          }),
        },
      });

      /* TODO: replace URL */
      // const resAdoptedTrees = await fetchAPI(urlAdoptedTrees, header);
      const jsonAdoptedTrees = await requests(
        urlAdoptedTrees,
        // `/get?queryType=adopted&uuid=${user.user_id}`,
        {
          token,
        }
      );
      store.setState({
        selectedTreeState: 'FETCHED',
        adoptedTrees: jsonAdoptedTrees.data,
      });
      setUnadopting(false);

      await isTreeAdopted({
        // isMounted,
        id,
        uuid: user.user_id,
        token,
        isAuthenticated,
        state,
        store,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  /**
   * FIXME: What is the purpose of this function?
   * What should it do
   *
   */
  const handleClick = () => {
    selectedTree ? unadoptTree(selectedTree.id) : '';
  };

  // const isTreeAdopted = async (treeid, uuid) => {
  //   try {
  //     if (isAuthenticated) {
  //       const token = await getTokenSilently();
  //       const url = createAPIUrl(
  //         state,
  //         `/get?queryType=istreeadopted&uuid=${uuid}&id=${treeid}`
  //       );
  //       // const r =
  //       //   /* TODO: replace URL */
  //       //   /* TODO: replace URL */
  //       //   /* TODO: replace URL */
  //       //   await fetchAPI(url, {
  //       //     headers: { Authorization: 'Bearer ' + token },
  //       //   });
  //       const json = await requests(url, { token });

  //       store.setState({ treeAdopted: json.data });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <StyledButtonAdopted
      role={'button'}
      tabIndex={0}
      onClick={() => {
        console.log('Clicked unadopt');
        handleClick();
      }}
    >
      <Label>{unadopting ? 'Entferne' : 'Adoptiert'}</Label>
      <CloseIcon />
    </StyledButtonAdopted>
  );
};

export default connect(
  state => ({
    treeAdopted: state.treeAdopted,
    selectedTree: state.selectedTree,
    user: state.user,
    state: state,
  }),
  Actions
)(ButtonAdopted);
