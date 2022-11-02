import { useRouter } from 'next/router';
import { FC } from 'react';
import styled from 'styled-components';
import { Tree } from '../../common/interfaces';
import TreeButton from '../TreeButton';

const WrapperOuter = styled.div`
  display: flex;
  column-gap: 8px;
  flex-wrap: wrap;
`;

const TreesList: FC<{
  trees: Tree[];
}> = ({ trees }) => {
  const { push } = useRouter();
  return (
    <WrapperOuter>
      {trees.map(tree =>
        tree && tree.id ? (
          <TreeButton
            key={tree.id}
            label={tree.artdtsch ? tree.artdtsch : tree.id}
            onClickHandler={() => {
              void push(`/tree/${tree.id}`);
            }}
          />
        ) : null
      )}
    </WrapperOuter>
  );
};

export default TreesList;
