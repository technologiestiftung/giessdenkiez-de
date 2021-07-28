import React, { FC } from 'react';
import { ImprintAndPrivacy } from '../../ImprintAndPrivacy';
import LoadingIcon, { SidebarLoadingContainer } from '../../LoadingIcon';
import SidebarTitle from '../SidebarTitle';

export const SidebarLoading: FC<{ title?: string }> = ({ title }) => (
  <>
    <SidebarTitle>{title || 'Lade'}</SidebarTitle>
    <SidebarLoadingContainer>
      <LoadingIcon text={`Lade ${title || ''}...`} />
    </SidebarLoadingContainer>
    <ImprintAndPrivacy />
  </>
);
