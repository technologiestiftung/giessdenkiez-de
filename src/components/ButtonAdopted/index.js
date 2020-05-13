import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';

import { connect } from 'unistore/react';
import Store from '../../state/Store';
import Actions from '../../state/Actions';
import { useAuth0 } from '../../utils/auth0';
import { fetchAPI, createAPIUrl } from '../../utils';

const StyledButtonAdopted = styled.div`
  font-size: 12px;
  border: 1px solid ${p => p.theme.colorTextDark};
  width: 75px;
  border-radius: 100px;
  display: flex;
  padding: 4px 5px 6px 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  transition: .125s opacity ease-in-out;
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    transition: .125s opacity ease-in-out;
    background: ${p => p.theme.colorTextDark};
    color: white;

    svg {
      transition: .125s opacity ease-in-out;
      fill: white;
    }
  }

  svg {
    width: .75em;
    height: .75em;
    transition: .125s opacity ease-in-out;
  }
`;

const Label = styled.span``;

const ButtonAdopted = p => {
  const { getTokenSilently, isAuthenticated } = useAuth0();
  const { selectedTree, state, user } = p;
  const [ unadopting, setUnadopting ] = useState(false);

  const handleClick = () => {
    selectedTree ? unadoptTree(selectedTree.id) : '';
  }

  const unadoptTree = async id => {
    try {
      Store.setState({ selectedTreeState: 'ADOPT' });
      const token = await getTokenSilently();
      const header = {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      };

      const urlUnadopt = createAPIUrl(
        state,
        `/private/unadopt-tree?tree_id=${id}&uuid=${user.user_id}`
      );

      const urlAdoptedTrees = createAPIUrl(
        Store.getState(),
        `/private/get-adopted-trees?uuid=${user.user_id}`
      );

      setUnadopting(true);

      const res = await fetchAPI(urlUnadopt, header);

      const resAdoptedTrees = await fetchAPI(urlAdoptedTrees, header);

      Store.setState({
        selectedTreeState: 'FETCHED',
        adoptedTrees: resAdoptedTrees.data,
      });
      setUnadopting(false);

      await isTreeAdopted(id, user.user_id)

    } catch (error) {
      console.error(error);
    }
  };

  const isTreeAdopted = async (treeid, uuid) => {
    if (isAuthenticated) {
      const token = await getTokenSilently();
      try {
        const url = createAPIUrl(
          state,
          `/private/get-is-tree-adopted?uuid=${uuid}&treeid=${treeid}`
        );
        const r = await fetchAPI(url, { headers: { Authorization: 'Bearer ' + token } });
        Store.setState({treeAdopted: r.data});
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <StyledButtonAdopted onClick={() => handleClick()}>
      <Label>{unadopting ? 'Entferne': 'Abonniert'}</Label>
      <CloseIcon />
    </StyledButtonAdopted>
  )
}

export default connect(state => ({
  treeAdopted: state.treeAdopted,
  selectedTree: state.selectedTree,
  user: state.user,
  state: state
}), Actions)(ButtonAdopted);
