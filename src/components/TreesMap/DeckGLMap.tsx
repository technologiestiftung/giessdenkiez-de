import React, { ReactNode } from 'react';
import { Map as MapboxMap, MapboxGeoJSONFeature } from 'mapbox-gl';
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
import {
  CommunityDataType,
  StoreProps,
  TreeGeojsonFeatureProperties,
} from '../../common/interfaces';
import { pumpToColor } from './mapColorUtil';
import { MapTooltip } from './MapTooltip';

import 'mapbox-gl/dist/mapbox-gl.css';
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
let selectedStateId: string | number | undefined = undefined;

const VIEWSTATE_TRANSITION_DURATION = 1000;
const VIEWSTATE_ZOOMEDIN_ZOOM = 19;
const colors = {
  transparent: [200, 200, 200, 0] as [number, number, number, number],
  blue: [53, 117, 177, 200] as [number, number, number, number],
  turquoise: [0, 128, 128, 200] as [number, number, number, number],
  red: [247, 105, 6, 255] as [number, number, number, number],
};

interface DeckGLPropType {
  treesGeoJson: ExtendedFeatureCollection | null;
  rainGeojson: ExtendedFeatureCollection | null;

  visibleMapLayer: StoreProps['visibleMapLayer'];
  ageRange: StoreProps['ageRange'];
  mapViewFilter: StoreProps['mapViewFilter'];
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
  address: string;
  status: string;
  check_date: string;
  style: string;
}

interface PumpTooltipType extends PumpPropertiesType {
  x: number;
  y: number;
}

interface DeckGLStateType {
  hoveredPump: PumpTooltipType | null;
  cursor: 'grab' | 'pointer';
  geoLocationAvailable: boolean;
  isTreeMapLoading: boolean;
  viewport: ViewportType;
}

class DeckGLMap extends React.Component<DeckGLPropType, DeckGLStateType> {
  constructor(props: DeckGLPropType) {
    super(props);

    this.state = {
      hoveredPump: null,
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

    this._onClick = this._onClick.bind(this);
    this._updateStyles = this._updateStyles.bind(this);
    this._deckClick = this._deckClick.bind(this);
    this.setCursor = this.setCursor.bind(this);
    this.onViewStateChange = this.onViewStateChange.bind(this);
  }

  _getFillColor(info: {
    properties: TreeGeojsonFeatureProperties;
  }): [number, number, number, number] {
    const { ageRange, mapViewFilter, communityData } = this.props;
    const [minFilteredAge, maxFilteredAge] = ageRange;
    const { properties } = info;
    const { id, radolan_sum, age: treeAge } = properties;
    const communityDataFlatMap = communityData && id && communityData[id];
    const { isWatered, isAdopted } = communityDataFlatMap || {};

    const rainDataExists = !!radolan_sum;

    const ageFilterIsApplied = minFilteredAge !== 0 || maxFilteredAge !== 320; // TODO: how to not hard-code these values?

    const treeIsWithinAgeRange =
      treeAge && treeAge >= minFilteredAge && treeAge <= maxFilteredAge;

    const colorsShallBeInterpolated =
      rainDataExists &&
      ((ageFilterIsApplied && treeIsWithinAgeRange) || !ageFilterIsApplied);

    const colorShallBeTransparent =
      (ageFilterIsApplied && !treeAge) ||
      (ageFilterIsApplied && !treeIsWithinAgeRange) ||
      !rainDataExists;

    if (colorShallBeTransparent) return colors.transparent;

    if (mapViewFilter === 'watered') {
      return communityDataFlatMap && isWatered && treeIsWithinAgeRange
        ? colors.blue
        : colors.transparent;
    }

    if (mapViewFilter === 'adopted') {
      return communityDataFlatMap && isAdopted && treeIsWithinAgeRange
        ? colors.turquoise
        : colors.transparent;
    }

    if (colorsShallBeInterpolated) {
      // Note: we do check if radolan_sum is defined by checking for rainDataExists, that's why the ts-ignore
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const interpolated = interpolateColor(radolan_sum);
      const hex = hexToRgb(interpolated);

      return hex;
    }

    return colors.transparent;
  }

  _renderLayers(): unknown[] {
    const {
      treesGeoJson,
      rainGeojson,
      visibleMapLayer,
      pumpsGeoJson,
    } = this.props;

    if (!treesGeoJson || !rainGeojson || !pumpsGeoJson) return [];
    const layers = [
      new GeoJsonLayer({
        id: 'geojson',
        data: isMobile ? [] : (treesGeoJson as any),
        opacity: 1,
        getLineWidth: (info: {
          properties: Pick<TreeGeojsonFeatureProperties, 'id'>;
        }): 0 | 2 => {
          const { selectedTreeId } = this.props;
          if (selectedTreeId && info.properties.id == selectedTreeId) return 2;
          return 0;
        },
        getLineColor: (info: {
          properties: Pick<TreeGeojsonFeatureProperties, 'id'>;
        }) => {
          const { selectedTreeId } = this.props;
          if (selectedTreeId && info.properties.id === selectedTreeId)
            return colors.red;
          return this._getFillColor(info);
        },
        visible: visibleMapLayer === 'trees',
        filled: true,
        parameters: () => ({
          depthTest: false,
        }),
        pickable: true,
        getRadius: 3,
        pointRadiusMinPixels: 0.5,
        autoHighlight: true,
        highlightColor: [200, 200, 200, 255],
        transitions: {
          getFillColor: {
            type: 'interpolation',
            duration: 500,
            easing: (t: number) => t,
          },
        },
        getFillColor: this._getFillColor.bind(this),
        onClick: info => {
          this._onClick(info.x, info.y, info.object);
        },
        updateTriggers: {
          getFillColor: [
            this.props.communityData?.wateredTrees,
            this.props.selectedTreeId,
            this.props.ageRange,
            this.props.mapViewFilter,
          ],
          getLineWidth: [this.props.selectedTreeId],
          getLineColor: [this.props.selectedTreeId],
        },
      }),
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
           * transferring 750.000 "," characters, therefore,
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
        getRadius: 9,
        pointRadiusMinPixels: 4,
        pickable: true,
        lineWidthScale: 3,
        lineWidthMinPixels: 1.5,
        onHover: (info: {
          x: number;
          y: number;
          object?: {
            properties?:
              | {
                  'pump:status'?: string;
                  'addr:full'?: string;
                  'pump:style'?: string;
                  check_date?: string;
                }
              | undefined;
          };
        }) => {
          if (info && info.object && info.object.properties) {
            this.setState({
              hoveredPump: {
                address: info.object.properties['addr:full'] || '',
                check_date: info.object.properties['check_date'] || '',
                status: info.object.properties['pump:status'] || '',
                style: info.object.properties['pump:style'] || '',
                x: info.x,
                y: info.y,
              },
            });
          } else {
            this.setState({ hoveredPump: null });
          }
        },
      }),
    ];

    return layers;
  }

  _deckClick(event: { x: number; y: number }): void {
    if (!isMobile || !map) return;

    if (selectedStateId) {
      map.setFeatureState(
        { sourceLayer: 'original', source: 'trees', id: selectedStateId },
        { select: false }
      );
      selectedStateId = undefined;
    }
    const features = map.queryRenderedFeatures([event.x, event.y], {
      layers: ['trees'],
    });

    if (features.length === 0) return;

    this._onClick(event.x, event.y, features[0]);

    if (!features[0].properties) return;

    map.setFeatureState(
      { sourceLayer: 'original', source: 'trees', id: features[0].id },
      { select: true }
    );
    selectedStateId = features[0].id;
  }

  setViewport(viewport: Partial<ViewportType>): void {
    this.setState({
      viewport: {
        ...this.state.viewport,
        ...viewport,
      },
    });
  }

  _onClick(
    _x: number,
    _y: number,
    object: Partial<MapboxGeoJSONFeature>
  ): void {
    const id: string = object.properties?.id;
    if (!id) return;

    this.props.onTreeSelect(id);
  }

  setCursor(val: unknown): void {
    if (val) {
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

    if (!isMobile) {
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
    } else {
      // disable map rotation using right click + drag
      map.dragRotate.disable();

      // disable map rotation using touch rotation gesture
      map.touchZoomRotate.disableRotation();

      map.addSource('trees', {
        type: 'vector',
        url: process.env.MAPBOX_TREES_TILESET_URL,
        minzoom: 11,
        maxzoom: 20,
      });

      map.addLayer({
        id: 'trees',
        type: 'circle',
        source: 'trees',
        'source-layer': process.env.MAPBOX_TREES_TILESET_LAYER,
        // TODO: Below we add the style for the trees on mobile. The color updates should be inserted or replicated here.
        paint: {
          'circle-radius': {
            base: 1.75,
            stops: [
              [11, 1],
              [22, 100],
            ],
          },
          'circle-opacity': 1,
          'circle-stroke-color': 'rgba(247, 105, 6, 1)',
          'circle-color': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            'rgba(200,200,200,1)',
            [
              'interpolate',
              ['linear'],
              ['get', 'radolan_sum'],
              0,
              interpolateColor(0),
              600,
              interpolateColor(60),
              1200,
              interpolateColor(120),
              1800,
              interpolateColor(180),
              2400,
              interpolateColor(240),
              3000,
              interpolateColor(300),
            ],
          ],
          'circle-stroke-width': [
            'case',
            ['boolean', ['feature-state', 'select'], false],
            15,
            0,
          ],
        },
      });
    }

    this.setState({ isTreeMapLoading: false });

    if (!this.props.focusPoint) return;
    this.setViewport({
      latitude: this.props.focusPoint.latitude,
      longitude: this.props.focusPoint.longitude,
      zoom: this.props.focusPoint.zoom || VIEWSTATE_ZOOMEDIN_ZOOM,
      transitionDuration: VIEWSTATE_TRANSITION_DURATION,
    });
  }

  _updateStyles(prevProps: DeckGLPropType): void {
    if (map && isMobile) {
      if (this.props.visibleMapLayer !== 'trees') {
        map.setLayoutProperty('trees', 'visibility', 'none');
      } else {
        map.setLayoutProperty('trees', 'visibility', 'visible');
      }
      if (prevProps.ageRange !== this.props.ageRange) {
        map.setPaintProperty('trees', 'circle-opacity', [
          'case',
          ['>=', ['get', 'age'], this.props.ageRange[0]],
          ['case', ['<=', ['get', 'age'], this.props.ageRange[1]], 1, 0],
          0,
        ]);
      }
      if (this.props.mapViewFilter === 'watered') {
        // TODO: check if there is a performance up for any of the two
        // ['in', ['get', 'id'], ['literal', [1, 2, 3]]]
        const filter = [
          'match',
          ['get', 'id'],
          this.props.communityDataWatered,
          true,
          false,
        ];
        map.setFilter('trees', filter);
      } else if (this.props.mapViewFilter === 'adopted') {
        const filter = [
          'match',
          ['get', 'id'],
          this.props.communityDataAdopted,
          true,
          false,
        ];
        map.setFilter('trees', filter);
      } else {
        map.setFilter('trees', null);
      }
    }
  }

  componentDidUpdate(prevProps: DeckGLPropType): boolean {
    if (!map) return false;
    const mapProps = [
      'communityData',
      'ageRange',
      'mapViewFilter',
      'treesVisible',
      'visibleMapLayer',
      'selectedTreeId',
      'focusPoint',
    ];
    let changed = false;
    mapProps.forEach(prop => {
      if (prevProps[prop] !== this.props[prop]) {
        changed = true;
      }
    });

    if (!changed) return false;
    this._updateStyles(prevProps);

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
    this.setViewport({
      latitude: viewport.latitude,
      longitude: viewport.longitude,
      zoom: viewport.zoom,
      transitionDuration:
        isMobile && viewport.zoom !== this.state.viewport.zoom
          ? VIEWSTATE_TRANSITION_DURATION
          : 0,
    });
  }

  render(): ReactNode {
    const { isNavOpen, showControls } = this.props;
    const { viewport, hoveredPump } = this.state;
    return (
      <>
        <DeckGL
          layers={this._renderLayers() as any}
          initialViewState={viewport}
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
                    this.setViewport({
                      longitude,
                      latitude,
                      zoom: VIEWSTATE_ZOOMEDIN_ZOOM,
                      transitionDuration: VIEWSTATE_TRANSITION_DURATION,
                    });
                  }}
                />
                <NavigationControl
                  onViewStateChange={e =>
                    this.setViewport({
                      latitude: e.viewState.latitude,
                      longitude: e.viewState.longitude,
                      zoom: e.viewState.zoom,
                      transitionDuration: VIEWSTATE_TRANSITION_DURATION,
                    })
                  }
                />
              </ControlWrapper>
            )}
          </StaticMap>
        </DeckGL>
        {hoveredPump && hoveredPump.x && hoveredPump.y && (
          <MapTooltip
            x={hoveredPump.x}
            y={hoveredPump.y}
            title='Öffentliche Straßenpumpe'
            subtitle={hoveredPump.address}
            infos={{
              Status: hoveredPump.status,
              'Letzter Check': hoveredPump.check_date,
              Pumpenstil: hoveredPump.style,
            }}
          />
        )}
      </>
    );
  }
}

export default DeckGLMap;
