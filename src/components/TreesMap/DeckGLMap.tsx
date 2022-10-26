import React, { ReactNode } from 'react';
import { Map as MapboxMap } from 'mapbox-gl';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';
import {
  StaticMap,
  GeolocateControl,
  NavigationControl,
  ViewportProps,
  FlyToInterpolator,
} from 'react-map-gl';
import DeckGL, { GeoJsonLayer } from 'deck.gl';
import { easeCubic as d3EaseCubic, ExtendedFeatureCollection } from 'd3';
import { interpolateColor, hexToRgb } from '../../utils/colorUtil';
import { CommunityDataType, StoreProps } from '../../common/interfaces';
import { getTreeCircleColor, pumpToColor } from './mapColorUtil';
import { MapTooltip } from './MapTooltip';
import {
  YOUNG_TREE_MAX_AGE,
  OLD_TREE_MIN_AGE,
  LOW_WATER_NEED_NUM,
  MEDIUM_WATER_NEED_NUM,
  HIGH_WATER_NEED_NUM,
} from '../../utils/getWaterNeedByAge';

import 'mapbox-gl/dist/mapbox-gl.css';
import { getFilterMatchingIdsList } from './mapboxGLExpressionsUtils';
import {
  updateHoverFeatureState,
  updateSelectedTreeIdFeatureState,
} from './mapFeatureStateUtil';
import {
  getTreeCircleRadius,
  updateTreeCirclePaintProps,
} from './mapPaintPropsUtils';
import { setBodyMapLayerClass } from './mapCSSClassUtil';

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

let map: MapboxMap | null = null;

const VIEWSTATE_TRANSITION_DURATION = 1000;
const VIEWSTATE_ZOOMEDIN_ZOOM = 19;

interface DeckGLPropType {
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

const StyledTextLink = styled.a`
  color: black;
`;

const pumpEventInfoToState = (info: PumpEventInfo) => {
  if (info && info.object && info.object.properties) {
    return {
      id: info.object.properties.id,
      address: info.object.properties['addr:full'] || '',
      check_date: info.object.properties['check_date'] || '',
      status: info.object.properties['pump:status'] || '',
      style: info.object.properties['pump:style'] || '',
      x: info.x,
      y: info.y,
    };
  }
  return null;
};

const getOSMEditorURL = (nodeId: number) => {
  const mapcompleteUrl = 'https://mapcomplete.osm.be/theme';
  const params = new URLSearchParams();
  params.set(
    'userlayout',
    'https://tordans.github.io/MapComplete-ThemeHelper/OSM-Berlin-Themes/man_made-walter_well-status-checker/theme.json'
  );
  params.set('language', 'de');
  const selectedPump = `#node/${nodeId}`;
  return `${mapcompleteUrl}?${params.toString()}${selectedPump}`;
};

class DeckGLMap extends React.Component<DeckGLPropType, DeckGLStateType> {
  constructor(props: DeckGLPropType) {
    super(props);

    this.state = {
      hoveredTreeId: null,
      hoveredPump: null,
      clickedPump: null,
      cursor: 'grab',
      geoLocationAvailable: false,
      isTreeMapLoading: true,
      viewport: {
        latitude: 52.500869,
        longitude: 13.419047,
        zoom: isMobile ? 13 : 11,
        maxZoom: VIEWSTATE_ZOOMEDIN_ZOOM,
        minZoom: isMobile ? 11 : 9,
        pitch: isMobile ? 0 : 45,
        bearing: 0,
        transitionDuration: 2000,
        transitionEasing: d3EaseCubic,
        transitionInterpolator: new FlyToInterpolator(),
      },
    };

    this._updateStyles = this._updateStyles.bind(this);
    this._deckClick = this._deckClick.bind(this);
    this.setCursor = this.setCursor.bind(this);
    this.onViewStateChange = this.onViewStateChange.bind(this);
  }

  _renderLayers(): unknown[] {
    const { rainGeojson, visibleMapLayer, pumpsGeoJson } = this.props;

    if (!rainGeojson || !pumpsGeoJson) return [];
    const layers = [
      new GeoJsonLayer({
        id: 'rain',
        data: rainGeojson as any,
        opacity: 0.95,
        visible: visibleMapLayer === 'rain' ? true : false,
        stroked: false,
        filled: true,
        extruded: true,
        wireframe: true,
        getElevation: 1,
        getFillColor: f => {
          /**
           * Apparently DWD 1 is not 1ml but 0.1ml
           * We could change this in the database, but this would mean,
           * transferring 800.000 "," characters, therefore,
           * changing it client-side makes more sense.
           */
          const interpolated = interpolateColor(
            (f as any).properties.data[0] / 10
          );
          const hex = hexToRgb(interpolated);
          return hex;
        },
        pickable: true,
      }),
      new GeoJsonLayer({
        id: 'pumps',
        data: pumpsGeoJson as any,
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        getPointRadius: 9,
        pointRadiusMinPixels: 4,
        pickable: true,
        lineWidthScale: 3,
        lineWidthMinPixels: 1.5,
        onHover: (info: PumpEventInfo) => {
          this.setState({
            hoveredPump: pumpEventInfoToState(info),
          });
        },
        onClick: (info: PumpEventInfo) => {
          this.setState({
            clickedPump: pumpEventInfoToState(info),
          });
        },
      }),
    ];

    return layers;
  }

  _deckClick(event: { x: number; y: number }): void {
    if (!map) return;

    const features = map.queryRenderedFeatures([event.x, event.y], {
      layers: ['trees'],
    });

    if (features.length === 0) return;

    const id: string = features[0].properties?.id;

    if (!id) return;

    this.props.onTreeSelect(id);
  }

  setViewport(viewport: Partial<ViewportType>): void {
    this.setState({
      viewport: {
        ...this.state.viewport,
        ...viewport,
      },
    });
  }

  setCursor(layer: unknown): void {
    if (layer) {
      // Note: This will only work for layers rendered by DeckGL.
      // Since we are adding the trees vector tile layer the "vanilla" way
      // (in _onload), we don't have an existing layer in setCursor,
      // so hovering the trees will always remain "grab":
      this.setState({ cursor: 'pointer' });
    } else {
      this.setState({ cursor: 'grab' });
    }
  }

  _onload(evt: { target: MapboxMap }): void {
    map = evt.target;

    if (!map || typeof map === 'undefined') return;

    const firstLabelLayerId = map
      .getStyle()
      .layers?.find(layer => layer.type === 'symbol')?.id;

    if (!firstLabelLayerId) return;

    map.addLayer(
      {
        id: '3d-buildings',
        source: 'composite',
        'source-layer': 'building',
        filter: ['==', 'extrude', 'true'],
        type: 'fill-extrusion',
        minzoom: 0,
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
    map.dragRotate.disable();

    // disable map rotation using touch rotation gesture
    map.touchZoomRotate.disableRotation();

    map.addSource('trees', {
      type: 'vector',
      url: process.env.MAPBOX_TREES_TILESET_URL,
      minzoom: 11,
      maxzoom: 20,
      promoteId: 'id',
    });

    map.addLayer({
      id: 'trees',
      type: 'circle',
      source: 'trees',
      'source-layer': process.env.MAPBOX_TREES_TILESET_LAYER,
      interactive: true,
      // TODO: Below we add the style for the trees on mobile. The color updates should be inserted or replicated here.
      paint: {
        'circle-radius': getTreeCircleRadius({}),
        'circle-opacity': 1,
        'circle-stroke-color': 'rgba(247, 105, 6, 1)',
        'circle-color': getTreeCircleColor(),
        'circle-stroke-width': [
          'case',
          ['boolean', ['feature-state', 'select'], false],
          15,
          0,
        ],
      },
    });

    map.on('mouseenter', 'trees', e => {
      if (!map || !e.features?.length) return;
      this.setState({ hoveredTreeId: e.features[0].id as string });
    });

    map.on('mouseleave', 'trees', e => {
      this.setState({ hoveredTreeId: null });
      if (!map || !e.features?.length) return;
    });

    updateSelectedTreeIdFeatureState({
      map,
      prevSelectedTreeId: undefined,
      currentSelectedTreeId: this.props.selectedTreeId,
    });

    setBodyMapLayerClass(this.props.visibleMapLayer);

    this.setState({ isTreeMapLoading: false });

    if (!this.props.focusPoint) return;
    this.setViewport({
      latitude: this.props.focusPoint.latitude,
      longitude: this.props.focusPoint.longitude,
      zoom: this.props.focusPoint.zoom || VIEWSTATE_ZOOMEDIN_ZOOM,
      transitionDuration: VIEWSTATE_TRANSITION_DURATION,
    });
  }

  _updateStyles(prevProps: DeckGLPropType, prevState: DeckGLStateType): void {
    if (!map) return;

    updateSelectedTreeIdFeatureState({
      map,
      prevSelectedTreeId: prevProps.selectedTreeId,
      currentSelectedTreeId: this.props.selectedTreeId,
    });

    if (prevState.hoveredTreeId !== this.state.hoveredTreeId) {
      updateHoverFeatureState({
        map,
        prevHoveredTreeId: prevState.hoveredTreeId,
        currentHoveredTreeId: this.state.hoveredTreeId,
      });
    }

    if (prevProps.visibleMapLayer !== this.props.visibleMapLayer) {
      setBodyMapLayerClass(this.props.visibleMapLayer);
    }
    if (this.props.visibleMapLayer !== 'trees') {
      map.setLayoutProperty('trees', 'visibility', 'none');
      return;
    } else {
      map.setLayoutProperty('trees', 'visibility', 'visible');
    }

    if (prevProps.mapViewFilter !== this.props.mapViewFilter) {
      updateTreeCirclePaintProps({
        map,
        wateredFilterOn: this.props.mapViewFilter === 'watered',
        adoptedFilterOn: this.props.mapViewFilter === 'adopted',
      });
    }

    if (prevProps.ageRange !== this.props.ageRange) {
      map.setPaintProperty('trees', 'circle-opacity', [
        'case',
        ['>=', ['get', 'age'], this.props.ageRange[0]],
        ['case', ['<=', ['get', 'age'], this.props.ageRange[1]], 1, 0],
        0,
      ]);
    }
    let communityFilter: boolean | unknown[] | null = null;
    let waterNeedFilter: boolean | unknown[] | null = null;
    if (this.props.mapViewFilter === 'watered') {
      communityFilter = getFilterMatchingIdsList(
        this.props.communityDataWatered
      );
    } else if (this.props.mapViewFilter === 'adopted') {
      communityFilter = getFilterMatchingIdsList(
        this.props.communityDataAdopted
      );
    }
    if (this.props.mapWaterNeedFilter !== null) {
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
        this.props.mapWaterNeedFilter,
        true,
        false,
      ];
    }

    map.setFilter(
      'trees',
      ['all', communityFilter, waterNeedFilter].filter(val => val !== null)
    );
  }

  componentDidUpdate(
    prevProps: DeckGLPropType,
    prevState: DeckGLStateType
  ): boolean {
    if (!map) return false;
    const stateKeys = ['hoveredTreeId'];
    const propsKeys = [
      'communityData',
      'communityDataWatered',
      'communityDataAdopted',
      'ageRange',
      'mapViewFilter',
      'mapWaterNeedFilter',
      'treesVisible',
      'visibleMapLayer',
      'selectedTreeId',
      'focusPoint',
    ];
    let changed = false;
    propsKeys.forEach(propKey => {
      if (prevProps[propKey] !== this.props[propKey]) {
        changed = true;
      }
    });
    stateKeys.forEach(stateKey => {
      if (prevState[stateKey] !== this.state[stateKey]) {
        changed = true;
      }
    });

    if (!changed) return false;
    this._updateStyles(prevProps, prevState);

    if (
      this.props.focusPoint &&
      prevProps.focusPoint?.id !== this.props.focusPoint?.id
    ) {
      this.setViewport({
        latitude: this.props.focusPoint.latitude,
        longitude: this.props.focusPoint.longitude,
        zoom: this.props.focusPoint.zoom || VIEWSTATE_ZOOMEDIN_ZOOM,
        transitionDuration: VIEWSTATE_TRANSITION_DURATION,
      });
    }

    return true;
  }

  onViewStateChange(viewport: ViewportProps): void {
    this.setState({ clickedPump: null, hoveredPump: null });
    this.setViewport({
      latitude: viewport.latitude,
      longitude: viewport.longitude,
      zoom: viewport.zoom,
      transitionDuration: 0,
    });
  }

  render(): ReactNode {
    const { isNavOpen, showControls } = this.props;
    const { viewport, clickedPump, hoveredPump } = this.state;
    const pumpInfo = clickedPump || hoveredPump;

    return (
      <>
        <DeckGL
          layers={this._renderLayers() as any}
          viewState={viewport as any}
          getCursor={() => this.state.cursor}
          onHover={({ layer }) => this.setCursor(layer)}
          onClick={this._deckClick}
          onViewStateChange={e => this.onViewStateChange(e.viewState)}
          controller
          style={{ overflow: 'hidden' }}
        >
          <StaticMap
            reuseMaps
            mapStyle='mapbox://styles/technologiestiftung/ckke3kyr00w5w17mytksdr3ro'
            preventStyleDiffing={true}
            mapboxApiAccessToken={process.env.MAPBOX_API_KEY}
            onLoad={this._onload.bind(this)}
            width='100%'
            height='100%'
          >
            {!showControls && (
              <ControlWrapper isNavOpen={isNavOpen}>
                <GeolocateControl
                  positionOptions={{ enableHighAccuracy: true }}
                  trackUserLocation={isMobile ? true : false}
                  showUserLocation={true}
                  onGeolocate={posOptions => {
                    const {
                      coords: { latitude, longitude },
                    } = (posOptions as unknown) as {
                      coords: {
                        latitude: number;
                        longitude: number;
                      };
                    };
                    this.setState({ clickedPump: null, hoveredPump: null });
                    this.setViewport({
                      longitude,
                      latitude,
                      zoom: VIEWSTATE_ZOOMEDIN_ZOOM,
                      transitionDuration: VIEWSTATE_TRANSITION_DURATION,
                    });
                  }}
                />
                <NavigationControl
                  onViewStateChange={e => {
                    this.setViewport({
                      latitude: e.viewState.latitude,
                      longitude: e.viewState.longitude,
                      zoom: e.viewState.zoom,
                      transitionDuration: VIEWSTATE_TRANSITION_DURATION,
                    });
                    this.setState({ clickedPump: null, hoveredPump: null });
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
              this.setState({ clickedPump: null });
            }}
            infos={{
              Status: pumpInfo.status,
              'Letzter Check': pumpInfo.check_date,
              Pumpenstil: pumpInfo.style,
              ...(pumpInfo.id
                ? {
                    '': (
                      <StyledTextLink
                        href={getOSMEditorURL(pumpInfo.id)}
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
  }
}

export default DeckGLMap;
