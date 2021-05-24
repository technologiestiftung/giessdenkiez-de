import React, { FC } from 'react';
import SidebarTitle from '../SidebarTitle';
import WaterSourceInfos from './WaterSourceInfos';
import LoadingIcon, { SidebarLoadingContainer } from '../../LoadingIcon';
import { useWaterSourceData } from '../../../utils/hooks/useWaterSourceData';
import { useCurrentWaterSourceId } from '../../../utils/hooks/useCurrentWaterSourceId';
import { ImprintAndPrivacy } from '../../ImprintAndPrivacy';
import { SidebarLoading } from '../SidebarLoading';

const SidebarWaterSource: FC<{ isLoading?: boolean }> = ({
  isLoading: isLoadingProps,
}) => {
  const waterSourceId = useCurrentWaterSourceId();
  const { waterSourceData: selectedWaterSourceData, error } = useWaterSourceData(waterSourceId);
  const isLoadingState = !error && !selectedWaterSourceData;
  const isLoading = isLoadingProps || isLoadingState || false;

  if (isLoading) return <SidebarLoading title='Information zu Wasserquelle' />;

  return (
    <>
      <SidebarTitle>Information zu Wasserquelle</SidebarTitle>
      {!isLoading && selectedWaterSourceData && (
        <WaterSourceInfos selectedWaterSourceData={selectedWaterSourceData} />
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

export default SidebarWaterSource;
