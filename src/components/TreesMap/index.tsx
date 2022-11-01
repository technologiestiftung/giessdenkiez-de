import React, { FC } from 'react';
import { useActions, useStoreState } from '../../state/unistore-hooks';
import { useTreeData } from '../../utils/hooks/useTreeData';
import { useHistory } from 'react-router';
import { useCurrentTreeId } from '../../utils/hooks/useCurrentTreeId';
import { useCommunityData } from '../../utils/hooks/useCommunityData';
import { useRainGeoJson } from '../../utils/hooks/useRainGeoJson';
import { usePumpsGeoJson } from '../../utils/hooks/usePumpsGeoJson';
import { TreesMap } from './TreesMap';
import 'mapbox-gl/dist/mapbox-gl.css';

export const Map: FC<{
  showOverlay: boolean | undefined;
  isNavOpened: boolean | undefined;
}> = ({ showOverlay, isNavOpened }) => {
  const visibleMapLayer = useStoreState('visibleMapLayer');
  const ageRange = useStoreState('ageRange');
  const mapViewFilter = useStoreState('mapViewFilter');
  const mapWaterNeedFilter = useStoreState('mapWaterNeedFilter');
  const mapFocusPoint = useStoreState('mapFocusPoint');

  const treeId = useCurrentTreeId();
  const { openNav, closeNav } = useActions();
  const { data: communityData } = useCommunityData();
  const { data: rainGeoJson } = useRainGeoJson();
  const { data: pumpsGeoJson } = usePumpsGeoJson();
  const { treeData: selectedTreeData } = useTreeData(treeId);
  const history = useHistory();

  return (
    <TreesMap
      onTreeSelect={id => {
        if (!id) {
          history.push('/');
          closeNav();
          return;
        }
        const nextLocation = `/tree/${id}`;
        history.push(nextLocation);
        openNav();
      }}
      rainGeojson={rainGeoJson || null}
      visibleMapLayer={visibleMapLayer}
      isNavOpen={!!isNavOpened}
      showControls={showOverlay}
      pumpsGeoJson={pumpsGeoJson || null}
      ageRange={ageRange || []}
      mapViewFilter={mapViewFilter}
      mapWaterNeedFilter={mapWaterNeedFilter}
      communityData={communityData?.communityFlagsMap || null}
      communityDataWatered={communityData?.wateredTreesIds || []}
      communityDataAdopted={communityData?.adoptedTreesIds || {}}
      selectedTreeId={treeId || undefined}
      focusPoint={selectedTreeData || mapFocusPoint}
    />
  );
};
