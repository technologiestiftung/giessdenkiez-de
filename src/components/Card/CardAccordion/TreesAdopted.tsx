import React, { FC } from 'react';
import styled from 'styled-components';
import { Tree } from '../../../common/interfaces';
import { useHistory } from 'react-router';
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
  const history = useHistory();

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
            label={tree.artdtsch ? tree.artdtsch : tree.id}
            onClickHandler={async () => {
              history.push(`/tree/${tree.id}`);
            }}
          />
        ) : null
      )}
    </WrapperOuter>
  );
};

export default TreesAdopted;
