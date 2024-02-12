import React, { FC } from 'react';
import { ImprintAndPrivacy } from '../../ImprintAndPrivacy';
import LoadingIcon, { SidebarLoadingContainer } from '../../LoadingIcon';
import SidebarTitle from '../SidebarTitle';
import useLocalizedContent from '../../../utils/hooks/useLocalizedContent';

export const SidebarLoading: FC<{ title?: string }> = ({ title }) => {
  const content = useLocalizedContent();
  const { loading } = content.sidebar;
  return (
    <>
      <SidebarTitle>{title || loading}</SidebarTitle>
      <SidebarLoadingContainer>
        <LoadingIcon text={`${loading} ${title || ''}...`} />
      </SidebarLoadingContainer>
      <ImprintAndPrivacy />
    </>
  );
};
