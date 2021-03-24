import React, { FC } from 'react';
import styled from 'styled-components';
import { Tree } from '../../../common/interfaces';
import { useActions } from '../../../state/unistore-hooks';
import TreeButton from '../../TreeButton';

const WrapperOuter = styled.div`
  display: flex;
  gap: 8px;
`;

const Title = styled.span`
  height: fit-content;
  cursor: pointer;
  font-weight: normal;
  font-size: ${p => p.theme.fontSizeL};
`;
// TODO: This is WIP. Not working yet
const TreesAdopted: FC<{
  trees: Tree[];
}> = ({ trees }) => {
  // const { selectTree } = useActions();

  if (trees.length === 0) {
    return (
      <WrapperOuter>
        <Title>Du hast noch keine Bäume adoptiert.</Title>
      </WrapperOuter>
    );
  }
  return (
    <WrapperOuter>
      {trees.map(tree =>
        tree && tree.id ? (
          <TreeButton
            key={tree.id}
            onClickHandler={async () => {
              // TODO: Merge We need a way to set the selected tree
              alert('Need a way to set the selected tree');
              // selectTree(tree.id ? tree.id : undefined);
            }}
          />
        ) : null
      )}
    </WrapperOuter>
  );
};

export default TreesAdopted;
