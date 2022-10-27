import { ExtendedFeatureCollection } from 'd3';
import React, { FC, useRef, useState } from 'react';
import { ViewportProps } from 'react-map-gl';
import { CommunityDataType, StoreProps } from '../../common/interfaces';

interface TreesMapPropsType {
  rainGeojson: ExtendedFeatureCollection | null;

  visibleMapLayer: StoreProps['visibleMapLayer'];
  ageRange: StoreProps['ageRange'];
  mapViewFilter: StoreProps['mapViewFilter'];
  mapWaterNeedFilter: StoreProps['mapWaterNeedFilter'];
  isNavOpen: StoreProps['isNavOpen'];
  focusPoint: StoreProps['mapFocusPoint'];

  pumpsGeoJson: ExtendedFeatureCollection | null;
  selectedTreeId: string | undefined;
  communityData: CommunityDataType['communityFlagsMap'];
  communityDataWatered: CommunityDataType['wateredTreesIds'];
  communityDataAdopted: CommunityDataType['adoptedTreesIds'];

  showControls: boolean | undefined;
  onTreeSelect: (id: string) => void;
}

type ViewportType = Pick<ViewportProps, 'latitude' | 'longitude' | 'zoom'>;

interface PumpPropertiesType {
  id?: number;
  address: string;
  status: string;
  check_date: string;
  style: string;
}

interface PumpTooltipType extends PumpPropertiesType {
  x: number;
  y: number;
}

interface PumpEventInfo {
  x: number;
  y: number;
  object?: {
    properties?:
      | {
          id: number;
          'pump:status'?: string;
          'addr:full'?: string;
          'pump:style'?: string;
          check_date?: string;
        }
      | undefined;
  };
}

interface DeckGLStateType {
  hoveredTreeId: string | null;
  hoveredPump: PumpTooltipType | null;
  clickedPump: PumpTooltipType | null;
  cursor: 'grab' | 'pointer';
  geoLocationAvailable: boolean;
  isTreeMapLoading: boolean;
  viewport: ViewportType;
}

export const TreesMap: FC<TreesMapPropsType> = ({}) => {
  const mapDomNodeRef = useRef<HTMLDivElement | null>(null);
  const [hoveredTreeId, setHoveredTreeId] = useState<string | null>(null);
  const [hoveredPump, setHoveredPump] = useState<PumpTooltipType | null>(null);
  const [clickedPump, setClickedPump] = useState<PumpTooltipType | null>(null);
  const [cursor, setCursor] = useState<'grab' | 'pointer'>('grab');
  const [geoLocationAvailable, setGeoLocationAvailable] = useState<
    'grab' | 'pointer'
  >('grab');
  return <div ref={mapDomNodeRef} />;
};
