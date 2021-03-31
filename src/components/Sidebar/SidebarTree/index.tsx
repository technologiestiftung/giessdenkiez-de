import React, { FC } from 'react';
import SidebarTitle from '../SidebarTitle';
import TreeInfos from './TreeInfos';
import LoadingIcon, { SidebarLoadingContainer } from '../../LoadingIcon';
import { useTreeData } from '../../../utils/hooks/useTreeData';
import { useCurrentTreeId } from '../../../utils/hooks/useCurrentTreeId';
import { ImprintAndPrivacy } from '../../ImprintAndPrivacy';
import { SidebarLoading } from '../SidebarLoading';

const SidebarTree: FC<{ isLoading?: boolean }> = ({
  isLoading: isLoadingProps,
}) => {
  const treeId = useCurrentTreeId();
  const { treeData: selectedTreeData, error } = useTreeData(treeId);
  const isLoadingState = !error && !selectedTreeData;
  const isLoading = isLoadingProps || isLoadingState || false;

  if (isLoading) return <SidebarLoading title='Bauminformation' />;

  return (
    <>
      <SidebarTitle>Bauminformation</SidebarTitle>
      {!isLoading && selectedTreeData && (
        <TreeInfos selectedTreeData={selectedTreeData} />
      )}
      {error && (
        <>
          <SidebarLoadingContainer>
            <LoadingIcon text={error.message} hasError={!!error} />
            <ImprintAndPrivacy />
          </SidebarLoadingContainer>
        </>
      )}
    </>
  );
};

export default SidebarTree;
