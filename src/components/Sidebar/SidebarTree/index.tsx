import React, { FC } from 'react';
import styled from 'styled-components';
import SidebarTitle from '../SidebarTitle';
import Card from '../../Card/Card';
import LoadingIcon from '../../LoadingIcon';
import { useTreeData } from '../../../utils/hooks/useTreeData';

const LoadingContainer = styled.div`
  width: 100%;
  min-height: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  place-items: center;
  place-content: center;
`;

const SidebarTree: FC = () => {
  const { treeData: selectedTreeData, error } = useTreeData();
  return (
    <>
      <SidebarTitle>Bauminformation</SidebarTitle>
      {!error && selectedTreeData && (
        <Card selectedTreeData={selectedTreeData} />
      )}
      {!error && !selectedTreeData && (
        <LoadingContainer>
          <LoadingIcon text='Lade Baum ...' />
        </LoadingContainer>
      )}
      {error && (
        <LoadingContainer>
          <LoadingIcon text={error.message} hasError={!!error} />
        </LoadingContainer>
      )}
    </>
  );
};

export default SidebarTree;
