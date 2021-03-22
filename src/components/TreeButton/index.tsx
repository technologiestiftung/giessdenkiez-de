import React, { FC, useState, useCallback } from 'react';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';
import store from '../../state/Store';
import { useAuth0 } from '../../utils/auth/auth0';
import { Tree } from '../../common/interfaces';
import { useActions } from '../../state/unistore-hooks';
import { getTreesAdoptedByUser } from '../../utils/requests/getTreesAdoptedByUser';
import { unadoptTree } from '../../utils/requests/unadoptTree';

const StyledTreeButton = styled.div`
  font-size: 12px;
  border: 1px solid ${p => p.theme.colorTextDark};
  border-radius: 100px;
  display: inline-flex;
  padding: 4px 5px 6px 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  transition: 0.125s opacity ease-in-out, box-shadow 200ms ease-out;
  margin-bottom: 10px;
  cursor: pointer;
  gap: 8px;

  &:hover {
    transition: 0.125s opacity ease-in-out;
    background: ${p => p.theme.colorTextDark};
    color: white;

    svg {
      transition: 0.125s opacity ease-in-out;
      fill: white;
    }
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px;
  }

  svg {
    width: 0.75em;
    height: 0.75em;
    transition: 0.125s opacity ease-in-out;
  }
`;

const Label = styled.span``;

const TreeButton: FC<{
  tree: Tree;
  label?: string;
}> = ({ tree, label }) => {
  const { user, getTokenSilently } = useAuth0();
  const { selectTree } = useActions();
  const [unadopting, setUnadopting] = useState<string | undefined>(undefined);

  const onButtonClick = useCallback(
    (tree: Tree) => {
      if (!tree?.id) return;
      selectTree(tree.id);
    },
    [selectTree]
  );

  const onCloseIconClick = useCallback(
    async (id: string, userId: string) => {
      setUnadopting(id);
      try {
        store.setState({ selectedTreeState: 'ADOPT' });

        const token = await getTokenSilently();
        await unadoptTree(id, userId, token);
        const adoptedTrees = await getTreesAdoptedByUser({ userId, token });
        store.setState({
          selectedTreeState: 'FETCHED',
          adoptedTrees,
        });
      } catch (err) {
        console.error(err);
      }
      setUnadopting(undefined);
    },
    [store, setUnadopting]
  );

  return (
    <StyledTreeButton
      role={'button'}
      tabIndex={0}
      onClick={() => onButtonClick(tree)}
    >
      <Label>
        {unadopting ? 'Entferne' : label || tree.artdtsch || 'Baum'}
      </Label>
      <CloseIcon
        onClick={() => tree.id && onCloseIconClick(tree.id, user.sub)}
      />
    </StyledTreeButton>
  );
};

export default TreeButton;
