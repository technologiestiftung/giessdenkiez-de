import React, { FC } from 'react';
import SidebarTitle from '../SidebarTitle';
import TreeInfos from './TreeInfos';
import LoadingIcon, { SidebarLoadingContainer } from '../../LoadingIcon';
import { useTreeData } from '../../../utils/hooks/useTreeData';
import { ImprintAndPrivacy } from '../../ImprintAndPrivacy';
import { SidebarLoading } from '../SidebarLoading';
import useLocalizedContent from '../../../utils/hooks/useLocalizedContent';

const SidebarTree: FC<{ treeId?: string | null; isLoading?: boolean }> = ({
  isLoading: isLoadingProps,
  treeId,
}) => {
  const { title } = useLocalizedContent().sidebar.tree;

  const { treeData: selectedTreeData, error } = useTreeData(treeId);
  const isLoadingState = !error && !selectedTreeData;
  const isLoading = isLoadingProps || isLoadingState || false;

  if (isLoading) return <SidebarLoading title={title} />;

  return (
    <>
      <SidebarTitle>{title}</SidebarTitle>
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
