import React, { FC } from 'react';
import styled from 'styled-components';
import { Tree } from '../../common/interfaces';
import { useHistory } from 'react-router';
import TreeButton from '../TreeButton';

const WrapperOuter = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const TreesList: FC<{
  trees: Tree[];
}> = ({ trees }) => {
  const history = useHistory();
  return (
    <WrapperOuter>
      {trees.map(tree =>
        tree && tree.id ? (
          <TreeButton
            key={tree.id}
            label={tree.artdtsch ? tree.artdtsch : tree.id}
            onClickHandler={() => {
              history.push(`/tree/${tree.id}`);
            }}
          />
        ) : null
      )}
    </WrapperOuter>
  );
};

export default TreesList;
