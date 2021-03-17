import React, { FC } from 'react';
import styled from 'styled-components';
import { Tree } from '../../../common/interfaces';
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

const TreesAdopted: FC<{
  trees: Tree[];
}> = ({ trees }) => {
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
        tree && tree.id ? <TreeButton key={tree.id} tree={tree} /> : null
      )}
    </WrapperOuter>
  );
};

export default TreesAdopted;
