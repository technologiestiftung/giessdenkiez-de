import { easeCubic as d3EaseCubic, ExtendedFeatureCollection } from 'd3';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { Map as MapboxMap } from 'mapbox-gl';
import {
  FlyToInterpolator,
  GeolocateControl,
  MapRef,
  NavigationControl,
  StaticMap,
  ViewportProps,
} from 'react-map-gl';
import { CommunityDataType, StoreProps } from '../../common/interfaces';
import DeckGL, { GeoJsonLayer, RGBAColor } from 'deck.gl';
import { pumpEventInfoToState, PumpEventInfoType } from './pumpsUtils';
import { getTreeCircleColor, pumpToColor } from './mapColorUtil';
import { hexToRgb, interpolateColor } from '../../utils/colorUtil';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';
import { MapTooltip } from './MapTooltip';
import { getOSMEditorURL } from './osmUtil';
import {
  getTreeCircleRadius,
  updateTreeCirclePaintProps,
} from './mapPaintPropsUtils';
import {
  updateHoverFeatureState,
  updateSelectedTreeIdFeatureState,
} from './mapFeatureStateUtil';
import { setBodyMapLayerClass } from './mapCSSClassUtil';
import { getFilterMatchingIdsList } from './mapboxGLExpressionsUtils';
import {
  YOUNG_TREE_MAX_AGE,
  OLD_TREE_MIN_AGE,
  LOW_WATER_NEED_NUM,
  MEDIUM_WATER_NEED_NUM,
  HIGH_WATER_NEED_NUM,
} from '../../utils/getWaterNeedByAge';
import { useActions, useStoreState } from '../../state/unistore-hooks';

const VIEWSTATE_TRANSITION_DURATION = 1000;
const VIEWSTATE_ZOOMEDIN_ZOOM = 19;

interface StyledProps {
  isNavOpen?: boolean;
}

const ControlWrapper = styled.div<StyledProps>`
  position: fixed;
  bottom: 12px;
  left: 12px;
  z-index: 2;
  transition: transform 500ms;

  @media screen and (min-width: ${p => p.theme.screens.tablet}) {
    transform: ${props =>
      props.isNavOpen ? 'translate3d(350px, 0, 0)' : 'translate3d(0, 0, 0)'};
  }

  & > div {
    position: static !important;
  }
`;

const StyledTextLink = styled.a`
  color: black;
`;

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
  onTreeSelect: (id?: string | null) => void;
}

interface ViewportType extends Partial<ViewportProps> {
  latitude: ViewportProps['latitude'];
  longitude: ViewportProps['longitude'];
  zoom: ViewportProps['zoom'];
}

interface PumpPropertiesType {
  id?: number;
  address: string;
  status: string;
  check_date: string;
  style: string;
  lat: number;
  lon: number;
}

interface PumpTooltipType extends PumpPropertiesType {
  x: number;
  y: number;
}

const [minLng, minLat, maxLng, maxLat] = (
  process.env.NEXT_PUBLIC_MAP_BOUNDING_BOX || ''
)
  .split(',')
  .map(coord => parseFloat(coord));

if (
  typeof maxLat !== 'number' ||
  typeof minLng !== 'number' ||
  typeof minLat !== 'number' ||
  typeof maxLng !== 'number'
) {
  throw new Error(`
    The environment variable NEXT_PUBLIC_MAP_BOUNDING_BOX was either missing or malformed.
    Please refer to the env.sample file for more info.
  `);
}

const initialLatitude =
  +process.env.NEXT_PUBLIC_MAP_INITIAL_LATITUDE || 52.500869;
const initialLongitude =
  +process.env.NEXT_PUBLIC_MAP_INITIAL_LONGITUDE || 13.419047;
const initialZoom = +process.env.NEXT_PUBLIC_MAP_INITIAL_ZOOM || 11;
const initialZoomMobile =
  +process.env.NEXT_PUBLIC_MAP_INITIAL_ZOOM_MOBILE || 13;

const defaultViewport = {
  latitude: initialLatitude,
  longitude: initialLongitude,
  zoom: isMobile ? initialZoomMobile : initialZoom,
  maxZoom: VIEWSTATE_ZOOMEDIN_ZOOM,
  minZoom: 11,
  pitch: isMobile ? 0 : 45,
  bearing: 0,
  transitionDuration: 2000,
  transitionEasing: d3EaseCubic,
  transitionInterpolator: new FlyToInterpolator(),
};

let hasUnmounted = false;
export const TreesMap = forwardRef<MapRef, TreesMapPropsType>(function TreesMap(
  {
    rainGeojson,
    visibleMapLayer,
    ageRange,
    mapViewFilter,
    mapWaterNeedFilter,
    isNavOpen,
    focusPoint,
    pumpsGeoJson,
    selectedTreeId,
    communityDataWatered,
    communityDataAdopted,
    showControls,
    onTreeSelect,
  },
  ref
) {
  const map = useRef<MapboxMap | null>(null);
  const lastSelectedTree = useRef<string | undefined>(selectedTreeId);
  const lastHoveredTreeId = useRef<string | null>(null);
  const [hoveredTreeId, setHoveredTreeId] = useState<string | null>(null);
  const [hoveredPump, setHoveredPump] = useState<PumpTooltipType | null>(null);
  const [clickedPump, setClickedPump] = useState<PumpTooltipType | null>(null);
  const [viewport, setViewport] = useState<ViewportType>(defaultViewport);
  const { setMapHasLoaded } = useActions();
  const pumpInfo = clickedPump || hoveredPump;
  const mapHasLoaded = useStoreState('mapHasLoaded');

  useEffect(
    () => () => {
      hasUnmounted = true;
    },
    []
  );

  const renderLayers = useCallback(() => {
    if (!map?.current || !rainGeojson || !pumpsGeoJson || hasUnmounted)
      return [];
    const layers = [
      new GeoJsonLayer({
        id: 'rain',
        data: rainGeojson as unknown,
        opacity: 0.95,
        visible: visibleMapLayer === 'rain' ? true : false,
        stroked: false,
        filled: true,
        extruded: true,
        wireframe: true,
        getElevation: 1,
        getFillColor: (f?: { properties?: { data?: number[] } }): RGBAColor => {
          /**
           * Apparently DWD 1 is not 1ml but 0.1ml
           * We could change this in the database, but this would mean,
           * transferring 800.000 "," characters, therefore,
           * changing it client-side makes more sense.
           */
          const features = f?.properties?.data || [];
          if (features.length === 0) return [0, 0, 0, 0];
          const interpolated = interpolateColor(features[0] / 10);
          const hex = hexToRgb(interpolated);
          return hex;
        },
        pickable: true,
      }),
      new GeoJsonLayer({
        id: 'pumps',
        data: pumpsGeoJson as unknown,
        opacity: 1,
        visible: visibleMapLayer === 'pumps' ? true : false,
        stroked: true,
        filled: true,
        extruded: true,
        wireframe: true,
        getElevation: 1,
        getLineColor: [0, 0, 0, 200],
        getFillColor: pumpToColor,
        // We ignore this because getPointRadius is missing typing in the version that we use:
        // @ts-ignore
        getPointRadius: 9,
        pointRadiusMinPixels: 4,
        pickable: true,
        lineWidthScale: 3,
        lineWidthMinPixels: 1.5,
        onHover: (pumpInfo: PumpEventInfoType) =>
          setHoveredPump(pumpEventInfoToState(pumpInfo)),
        onClick: (pumpInfo: PumpEventInfoType) =>
          setClickedPump(pumpEventInfoToState(pumpInfo)),
      }),
    ];

    return layers as unknown[];
  }, [pumpsGeoJson, rainGeojson, visibleMapLayer]);

  const onViewStateChange = useCallback((newViewport: ViewportProps) => {
    if (hasUnmounted) return;
    const newViewState = {
      ...defaultViewport,
      ...newViewport,
      transitionDuration: newViewport.transitionDuration || 0,
    };
    setClickedPump(null);
    setHoveredPump(null);
    setViewport({
      ...newViewState,
      latitude: Math.min(maxLat, Math.max(newViewState.latitude, minLat)),
      longitude: Math.min(maxLng, Math.max(newViewState.longitude, minLng)),
    });
  }, []);

  const onMapClick = useCallback(
    (info: { x: number; y: number }, evt: MouseEvent) => {
      if (!map.current || hasUnmounted) return;

      const eventTarget = (evt?.target as unknown) as { tagName: string };
      if (eventTarget.tagName !== 'CANVAS') return;
      const features = map.current.queryRenderedFeatures([info.x, info.y], {
        layers: ['trees'],
      });

      if (features.length === 0) {
        onTreeSelect(null);
        return;
      }

      const id: string = features[0].properties?.id as string;

      if (!id) return;

      onTreeSelect(id);
    },
    [onTreeSelect]
  );

  const onLoad = useCallback(
    (evt: { target: MapboxMap }) => {
      map.current = evt.target;

      if (!map.current || typeof map.current === 'undefined' || hasUnmounted)
        return;

      setMapHasLoaded();

      const firstLabelLayerId = map.current
        .getStyle()
        .layers?.find(layer => layer.type === 'symbol')?.id;

      if (!firstLabelLayerId) return;

      map.current.addLayer(
        {
          id: '3d-buildings',
          source: 'composite',
          'source-layer': 'building',
          filter: ['==', 'extrude', 'true'],
          type: 'fill-extrusion',
          paint: {
            'fill-extrusion-color': '#FFF',
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height'],
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height'],
            ],
            'fill-extrusion-opacity': 0.3,
          },
        },
        firstLabelLayerId
      );

      // disable map rotation using right click + drag
      map.current.dragRotate.disable();

      // disable map rotation using touch rotation gesture
      map.current.touchZoomRotate.disableRotation();

      map.current.addSource('trees', {
        type: 'vector',
        url: process.env.NEXT_PUBLIC_MAPBOX_TREES_TILESET_URL,
        minzoom: 0,
        maxzoom: 20,
        promoteId: 'id',
      });

      map.current.addLayer({
        id: 'trees',
        type: 'circle',
        source: 'trees',
        'source-layer': process.env.NEXT_PUBLIC_MAPBOX_TREES_TILESET_LAYER,
        interactive: true,
        minzoom: 0,
        paint: {
          'circle-pitch-alignment': 'map',
          'circle-radius': getTreeCircleRadius({}),
          'circle-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0,
            1,
            20,
            0.5,
          ],
          'circle-stroke-color': [
            'case',
            ['boolean', ['feature-state', 'select'], false],
            'rgba(247, 105, 6, 1)',
            getTreeCircleColor(),
          ],
          'circle-color': getTreeCircleColor(),
          'circle-stroke-width': [
            'case',
            ['boolean', ['feature-state', 'select'], false],
            15,
            0,
          ],
        },
      });

      map.current.on('mousemove', 'trees', e => {
        if (!map.current || !e.features) return;
        if (e.features?.length === 0) setHoveredTreeId(null);
        setHoveredTreeId(e.features[0].id as string);
      });

      map.current.on('mouseleave', 'trees', e => {
        setHoveredTreeId(null);
        if (!map.current || !e.features?.length) return;
      });

      updateSelectedTreeIdFeatureState({
        map: map.current,
        prevSelectedTreeId: undefined,
        currentSelectedTreeId: selectedTreeId,
      });

      setBodyMapLayerClass(visibleMapLayer);

      if (!focusPoint) return;
      onViewStateChange({
        latitude: focusPoint.latitude,
        longitude: focusPoint.longitude,
        zoom: focusPoint.zoom || VIEWSTATE_ZOOMEDIN_ZOOM,
        transitionDuration: VIEWSTATE_TRANSITION_DURATION,
      });
    },
    [
      focusPoint,
      onViewStateChange,
      selectedTreeId,
      setMapHasLoaded,
      visibleMapLayer,
    ]
  );

  useEffect(() => {
    if (!map?.current || hasUnmounted || !mapHasLoaded) return;
    updateSelectedTreeIdFeatureState({
      map: map.current,
      prevSelectedTreeId: lastSelectedTree.current,
      currentSelectedTreeId: selectedTreeId,
    });
    lastSelectedTree.current = selectedTreeId;
  }, [selectedTreeId, mapHasLoaded]);

  useEffect(() => {
    if (!map?.current || hasUnmounted || !mapHasLoaded) return;
    updateHoverFeatureState({
      map: map.current,
      prevHoveredTreeId: lastHoveredTreeId.current,
      currentHoveredTreeId: hoveredTreeId,
    });
    lastHoveredTreeId.current = hoveredTreeId;
  }, [hoveredTreeId, mapHasLoaded]);

  useEffect(() => {
    setBodyMapLayerClass(visibleMapLayer);

    if (!map?.current || hasUnmounted) return;
    if (visibleMapLayer !== 'trees') {
      map.current.setLayoutProperty('trees', 'visibility', 'none');
      return;
    } else {
      map.current.setLayoutProperty('trees', 'visibility', 'visible');
    }
  }, [visibleMapLayer]);

  useEffect(() => {
    if (
      !map?.current ||
      hasUnmounted ||
      !communityDataWatered.length ||
      Object.keys(communityDataAdopted).length === 0
    )
      return;

    updateTreeCirclePaintProps({
      map: map.current,
      wateredFilterOn: mapViewFilter === 'watered',
      adoptedFilterOn: mapViewFilter === 'adopted',
    });

    let communityFilter: boolean | unknown[] | null = null;
    let waterNeedFilter: boolean | unknown[] | null = null;
    if (mapViewFilter === 'watered') {
      communityFilter = getFilterMatchingIdsList(communityDataWatered);
    } else if (mapViewFilter === 'adopted') {
      communityFilter = getFilterMatchingIdsList(
        Object.keys(communityDataAdopted)
      );
    }
    if (mapWaterNeedFilter !== null) {
      waterNeedFilter = [
        'match',
        [
          'case',
          ['<', ['get', 'age'], OLD_TREE_MIN_AGE],
          [
            'case',
            ['<', ['get', 'age'], YOUNG_TREE_MAX_AGE],
            HIGH_WATER_NEED_NUM,
            MEDIUM_WATER_NEED_NUM,
          ],
          LOW_WATER_NEED_NUM,
        ],
        mapWaterNeedFilter,
        true,
        false,
      ];
    }

    map.current.setFilter(
      'trees',
      ['all', communityFilter, waterNeedFilter].filter(val => val !== null)
    );
  }, [
    communityDataAdopted,
    communityDataWatered,
    mapViewFilter,
    mapWaterNeedFilter,
  ]);

  useEffect(() => {
    if (!map?.current || hasUnmounted) return;
    map.current.setPaintProperty('trees', 'circle-opacity', [
      'case',
      ['>=', ['get', 'age'], ageRange[0]],
      ['case', ['<=', ['get', 'age'], ageRange[1]], 1, 0],
      0,
    ]);
  }, [ageRange]);

  useEffect(() => {
    if (!map?.current || hasUnmounted) return;
    map.current.getContainer().style.cursor =
      hoveredTreeId || hoveredPump ? 'pointer' : 'grab';
  }, [hoveredTreeId, hoveredPump]);

  useEffect(() => {
    if (!focusPoint?.id || hasUnmounted) return;
    onViewStateChange({
      latitude: focusPoint.latitude,
      longitude: focusPoint.longitude,
      zoom: focusPoint.zoom || VIEWSTATE_ZOOMEDIN_ZOOM,
      transitionDuration: VIEWSTATE_TRANSITION_DURATION,
    });
  }, [
    focusPoint?.latitude,
    focusPoint?.longitude,
    focusPoint?.zoom,
    focusPoint?.id,
    onViewStateChange,
  ]);

  return (
    <>
      <DeckGL
        layers={renderLayers()}
        viewState={viewport as unknown}
        onViewStateChange={(e: { viewState: ViewportProps }) =>
          onViewStateChange(e.viewState)
        }
        onClick={onMapClick}
        controller
        style={{ overflow: 'hidden' }}
      >
        <StaticMap
          reuseMaps
          ref={ref}
          mapStyle='mapbox://styles/technologiestiftung/ckke3kyr00w5w17mytksdr3ro'
          preventStyleDiffing={true}
          mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
          onLoad={onLoad}
          width='100%'
          height='100%'
        >
          {!showControls && (
            <ControlWrapper isNavOpen={isNavOpen}>
              <GeolocateControl
                positionOptions={{ enableHighAccuracy: true }}
                trackUserLocation={isMobile ? true : false}
                showUserLocation={true}
                onGeolocate={(posOptions: {
                  coords: {
                    latitude: number;
                    longitude: number;
                  };
                }) => {
                  const { latitude, longitude } = posOptions.coords;
                  onViewStateChange({
                    longitude,
                    latitude,
                    zoom: VIEWSTATE_ZOOMEDIN_ZOOM,
                    transitionDuration: VIEWSTATE_TRANSITION_DURATION,
                  });
                }}
              />
              <NavigationControl
                onViewStateChange={e => {
                  const newViewState = (e as { viewState: ViewportType })
                    .viewState;
                  onViewStateChange({
                    latitude: newViewState.latitude,
                    longitude: newViewState.longitude,
                    zoom: newViewState.zoom,
                    transitionDuration: VIEWSTATE_TRANSITION_DURATION,
                  });
                }}
              />
            </ControlWrapper>
          )}
        </StaticMap>
      </DeckGL>
      {pumpInfo && pumpInfo.x && pumpInfo.y && (
        <MapTooltip
          x={pumpInfo.x}
          y={pumpInfo.y}
          title='Öffentliche Straßenpumpe'
          subtitle={pumpInfo.address}
          onClickOutside={() => {
            setClickedPump(null);
          }}
          infos={{
            Status: pumpInfo.status,
            'Letzter Check': pumpInfo.check_date,
            Pumpenstil: pumpInfo.style,
            ...(pumpInfo.id
              ? {
                  '': (
                    <StyledTextLink
                      href={getOSMEditorURL({
                        nodeId: pumpInfo.id,
                        lat: pumpInfo.lat,
                        lon: pumpInfo.lon,
                      })}
                      target='_blank'
                      rel='noreferrer nofollow'
                    >
                      Status in OpenStreetMap aktualisieren
                    </StyledTextLink>
                  ),
                }
              : {}),
          }}
        />
      )}
    </>
  );
});
