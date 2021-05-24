import React, { FC } from 'react';
import DeckGlMap from './DeckGLMap';
import { useStoreState } from '../../state/unistore-hooks';
import { useTreeData } from '../../utils/hooks/useTreeData';
import { useWaterSourceData } from '../../utils/hooks/useWaterSourceData';
import { useHistory } from 'react-router';
import { useCurrentTreeId } from '../../utils/hooks/useCurrentTreeId';
import { useCurrentWaterSourceId } from '../../utils/hooks/useCurrentWaterSourceId';
import { useCommunityData } from '../../utils/hooks/useCommunityData';
import { useRainGeoJson } from '../../utils/hooks/useRainGeoJson';
import { usePumpsGeoJson } from '../../utils/hooks/usePumpsGeoJson';
import { useWaterSourcesGeoJson } from '../../utils/hooks/useWaterSourcesGeoJson';
import { useTreesGeoJson } from '../../utils/hooks/useTreesGeoJson';

export const Map: FC<{
  showOverlay: boolean | undefined;
  isNavOpened: boolean | undefined;
}> = ({ showOverlay, isNavOpened }) => {
  const visibleMapLayer = useStoreState('visibleMapLayer');
  const ageRange = useStoreState('ageRange');
  const mapViewFilter = useStoreState('mapViewFilter');
  const mapFocusPoint = useStoreState('mapFocusPoint');

  const treeId = useCurrentTreeId();
  const waterSourceId = useCurrentWaterSourceId();
  const { data: communityData } = useCommunityData();
  const { data: rainGeoJson } = useRainGeoJson();
  const { data: pumpsGeoJson } = usePumpsGeoJson();
  const { data: waterSourcesGeoJson } = useWaterSourcesGeoJson();
  const { data: treesGeoJson } = useTreesGeoJson();
  const { treeData: selectedTreeData } = useTreeData(treeId);
  const { waterSourceData: selectedWaterSourceData } = useWaterSourceData(waterSourceId);
  const history = useHistory();

  return (
    <DeckGlMap
      onTreeSelect={(id: string) => {
        const nextLocation = `/tree/${id}`;
        history.push(nextLocation);
      }}
      onWaterSourceSelect={(id: string) => {
        const nextLocation = `/watersource/${id}`;
        history.push(nextLocation);
      }}
      treesGeoJson={treesGeoJson || null}
      rainGeojson={rainGeoJson || null}
      visibleMapLayer={visibleMapLayer}
      isNavOpen={!!isNavOpened}
      showControls={showOverlay}
      pumpsGeoJson={pumpsGeoJson || null}
      waterSourcesGeoJson={waterSourcesGeoJson || null}
      ageRange={ageRange || []}
      mapViewFilter={mapViewFilter}
      communityData={communityData?.communityFlagsMap || null}
      communityDataWatered={communityData?.wateredTreesIds || []}
      communityDataAdopted={communityData?.adoptedTreesIds || []}
      selectedTreeId={treeId || undefined}
      selectedWaterSourceId={waterSourceId || undefined}
      focusPoint={selectedTreeData || selectedWaterSourceData || mapFocusPoint}
    />
  );
};
