import React, { FC, useState } from 'react';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';
import store from '../../state/Store';
import { useAuth0 } from '../../utils/auth/auth0';
import { createAPIUrl, requests, isTreeAdopted } from '../../utils';
import { useStore, useStoreState } from '../../state/unistore-hooks';

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

const ButtonAdopted: FC = () => {
  const { getTokenSilently, isAuthenticated } = useAuth0();
  const { selectedTree } = useStoreState('selectedTree');
  const { user } = useStoreState('user');
  const state = useStore().getState();
  const [unadopting, setUnadopting] = useState(false);

  // FIXME: Duplicate code appears also in
  // SidebarAdopted
  // TreesAdopted
  // ButtonAdopted
  // all three have a little bit different code

  const unadoptTree: (id: string) => Promise<void> = async id => {
    try {
      store.setState({ selectedTreeState: 'ADOPT' });
      const token = await getTokenSilently();

      const urlUnadopt = createAPIUrl(state, '/delete');
      const urlAdoptedTrees = createAPIUrl(
        store.getState(),
        `/get?queryType=adopted&uuid=${user.user_id}`
      );
      setUnadopting(true);

      await requests(urlUnadopt, {
        token,
        override: {
          method: 'DELETE',
          body: JSON.stringify({
            uuid: user.user_id,
            tree_id: id,
            queryType: 'unadopt',
          }),
        },
      });

      const jsonAdoptedTrees = await requests(urlAdoptedTrees, {
        token,
      });
      store.setState({
        selectedTreeState: 'FETCHED',
        adoptedTrees: jsonAdoptedTrees.data,
      });
      setUnadopting(false);
      await isTreeAdopted({
        id,
        uuid: user.user_id,
        token,
        isAuthenticated,
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

  return (
    <StyledButtonAdopted
      role={'button'}
      tabIndex={0}
      onClick={() => {
        handleClick();
      }}
    >
      <Label>{unadopting ? 'Entferne' : 'Adoptiert'}</Label>
      <CloseIcon />
    </StyledButtonAdopted>
  );
};

export default ButtonAdopted;
