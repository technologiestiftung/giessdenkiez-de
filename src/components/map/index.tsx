// @ts-nockeck
import React from 'react';
import { connect } from 'unistore/react';
import Actions, {
  SetDetailRouteWithListPathType,
  SetViewportType,
  SetViewType,
} from '../../state/Actions';

import styled from 'styled-components';
import { isMobile } from 'react-device-detect';
import { StaticMap, GeolocateControl, NavigationControl } from 'react-map-gl';
import DeckGL, { GeoJsonLayer } from 'deck.gl';
import store from '../../state/Store';
import { wateredTreesSelector } from '../../state/Selectors';
import { interpolateColor, hexToRgb } from '../../utils';
import { HoverObject } from './HoverObject';
import { Generic, StoreProps } from '../../common/interfaces';
import {
  RGBAColor,
  defaultColor,
  brokenColor,
  workingColor,
  lockedColor,
} from './colors';

type RainDataType = StoreProps['data'];
type RainGeoJSONType = StoreProps['rainGeojson'];
type WateredTreesType = StoreProps['wateredTrees'];
type CommunityDataType = StoreProps['communityData'];
type CommunityDataWateredType = StoreProps['communityDataWatered'];
type CommunityDataAdoptedType = StoreProps['communityDataAdopted'];
type DataViewType = StoreProps['dataView'];
type PumpsType = StoreProps['pumps'];

interface MapPropType {
  data: RainDataType;
  rainGeojson: RainGeoJSONType;
  dataView: DataViewType;
  pumps: PumpsType;
  pumpsVisible: boolean;
  isTreeDataLoading: boolean;
  isNavOpen: boolean;
  treesVisible: boolean;
  rainVisible: boolean;
  overlay: boolean;
  wateredTrees: WateredTreesType;
  highlightedObject: string | undefined;
  ageRange: [number, number];
  communityData: CommunityDataType;
  communityDataWatered: CommunityDataWateredType;
  communityDataAdopted: CommunityDataAdoptedType;
  viewport: StoreProps['viewport'];
  selectedTree: StoreProps['selectedTree'];
}

interface MapActionsType {
  setDetailRouteWithListPath: SetDetailRouteWithListPathType;
  setViewport: SetViewportType;
  setView: SetViewType;
}

type MapType = MapActionsType & MapPropType;

interface MapStateType {
  isHovered: boolean;
  hoverObjectMessage: string;
  hoverObjectPointer: number[];
  data: unknown | null;
  included: unknown | null;
  cursor: CSSStyleDeclaration['cursor'];
  geoLocationAvailable: boolean;
}

interface StyledProps {
  isNavOpen?: boolean;
}
const ControlWrapper = styled.div<StyledProps>`
  position: absolute;
  bottom: 12px;
  left: 12px;
  z-index: 2;
  transition: transform 500ms;

  @media screen and (min-width: ${p => p.theme.screens.tablet}) {
    transform: ${props =>
      props.isNavOpen ? 'translate3d(350px, 0, 0)' : 'none'};
  }
`;

let selectedStateId: string | null = null;

const MAPBOX_TOKEN = process.env.API_KEY;
const pumpsColor: (info: Generic) => RGBAColor = info => {
  if (info === undefined) {
    return defaultColor.rgba;
  }
  if (info.properties['pump:status']) {
    const status = info.properties['pump:status'];
    switch (status) {
      case 'unbekannt': {
        return defaultColor.rgba;
      }
      case 'defekt': {
        return brokenColor.rgba;
      }
      case 'funktionsfähig': {
        return workingColor.rgba;
      }
      case 'verriegelt': {
        return lockedColor.rgba;
      }

      default: {
        return defaultColor.rgba;
      }
    }
  }
  return defaultColor.rgba;
};

const getTreeDotColor = (
  info: {
    properties: { id: string; radolan_sum: number; age: number };
  },
  props: {
    ageRange: MapPropType['ageRange'];
    dataView: MapPropType['dataView'];
    communityData: MapPropType['communityData'];
  }
): RGBAColor => {
  const { ageRange, dataView, communityData } = props;
  const { properties } = info;
  const { id, radolan_sum, age } = properties;

  if (!communityData || !dataView) return [0, 0, 0, 0];

  if (dataView === 'watered' && communityData[id]) {
    return communityData[id].watered ? [53, 117, 177, 200] : [0, 0, 0, 0];
  }

  if (dataView === 'adopted' && communityData[id]) {
    return communityData[id].adopted ? [0, 128, 128, 200] : [0, 0, 0, 0];
  }

  if (dataView === 'adopted' || dataView === 'watered') {
    return [0, 0, 0, 0];
  }

  if (age >= ageRange[0] && age <= ageRange[1]) {
    const interpolated = interpolateColor(radolan_sum);
    const hex = hexToRgb(interpolated);

    return hex && hex.length === 4
      ? [hex[0], hex[1], hex[2], hex[3]]
      : [0, 0, 0, 0];
  }

  if (Number.isNaN(age)) {
    return [200, 200, 200, 0];
  }

  return [200, 200, 200, 0];
};

class DeckGLMap extends React.Component<MapType> {
  map: any | undefined;
  state: MapStateType;

  constructor(props: MapType) {
    super(props);

    this.state = {
      isHovered: false,
      hoverObjectPointer: [],
      hoverObjectMessage: '',
      data: null,
      included: null,
      cursor: 'grab',
      geoLocationAvailable: false,
    };

    this._onClick = this._onClick.bind(this);
    this._updateStyles = this._updateStyles.bind(this);
    this._deckClick = this._deckClick.bind(this);
    this.setCursor = this.setCursor.bind(this);
  }

  _renderLayers() {
    const {
      data,
      rainGeojson,
      treesVisible,
      pumpsVisible,
      rainVisible,
      pumps,
    } = this.props;

    if (data && rainGeojson && pumps) {
      const layers = [
        new GeoJsonLayer({
          id: 'geojson',
          data: isMobile ? [] : data,
          opacity: 1,
          getLineWidth: (info: { properties: { id: string } }) => {
            const { selectedTree } = this.props;
            const id = info.properties.id;

            if (selectedTree && selectedTree.id === id) {
              return 2;
            }
            return 0;
          },
          getLineColor: (info: {
            properties: { id: string; radolan_sum: number; age: number };
          }) => {
            const {
              selectedTree,
              ageRange,
              dataView,
              communityData,
            } = this.props;
            const id = info.properties.id;

            if (selectedTree && selectedTree.id === id) {
              return [247, 105, 6, 255];
            }
            return getTreeDotColor(info, {
              ageRange,
              dataView,
              communityData,
            });
          },
          visible: treesVisible,
          filled: true,
          parameters: () => ({
            depthTest: false,
          }),
          pickable: true,
          getRadius: 3,
          type: 'circle',
          pointRadiusMinPixels: 0.5,
          autoHighlight: true,
          highlightColor: [200, 200, 200, 255],
          transitions: {
            getFillColor: {
              type: 'interpolation',
              duration: 500,
            },
          },
          getFillColor: (info: {
            properties: { id: string; radolan_sum: number; age: number };
          }) => {
            const { ageRange, dataView, communityData } = this.props;
            return getTreeDotColor(info, { ageRange, dataView, communityData });
          },
          onClick: info => {
            const { setDetailRouteWithListPath } = this.props;
            this._onClick(info.x, info.y, info.object);

            if (info.object !== undefined) {
              store.setState({
                highlightedObject: info.object.properties['id'],
              });
              setDetailRouteWithListPath(info.object.properties.id);
            }
          },
          updateTriggers: {
            getFillColor: [
              this.props.wateredTrees,
              this.props.selectedTree,
              this.props.ageRange,
              this.props.dataView,
            ],
            getLineWidth: [this.props.selectedTree],
            getLineColor: [
              this.props.wateredTrees,
              this.props.selectedTree,
              this.props.ageRange,
              this.props.dataView,
            ],
          },
        }),
        new GeoJsonLayer({
          id: 'rain',
          data: rainGeojson,
          opacity: 0.95,
          visible: rainVisible,
          stroked: false,
          filled: true,
          extruded: true,
          wireframe: true,
          getElevation: 1,
          getFillColor: (
            geoJsonFeature: {
              properties?: {
                data?: number[];
              };
            } = {}
          ) => {
            /**
             * Apparently DWD 1 is not 1ml but 0.1ml
             * We could change this in the database, but this would mean,
             * transferring 625.000 "," characters, therefore,
             * changing it client-side makes more sense.
             */
            if (
              !geoJsonFeature?.properties?.data?.length ||
              geoJsonFeature.properties.data.length === 0
            )
              return [0, 0, 0, 0];
            const interpolated = interpolateColor(
              geoJsonFeature.properties.data[0] / 10
            );
            const hex = hexToRgb(interpolated);
            return hex && hex.length === 4
              ? [hex[0], hex[1], hex[2], hex[3]]
              : [0, 0, 0, 0];
          },
          pickable: true,
        }),
        new GeoJsonLayer({
          id: 'pumps',
          data: pumps,
          opacity: 1,
          visible: pumpsVisible,
          stroked: true,
          filled: true,
          extruded: true,
          wireframe: true,
          getElevation: 1,
          getLineColor: [0, 0, 0, 200],
          getFillColor: pumpsColor,
          getRadius: 9,
          pointRadiusMinPixels: 4,
          pickable: true,
          lineWidthScale: 3,
          lineWidthMinPixels: 1.5,
          onHover: info => {
            if (info.object === undefined) {
              this.setState({ isHovered: false });
              return;
            }
            this.setState({ isHovered: true });
            this.setState({
              hoverObjectMessage: info.object.properties['pump:status'],
            });
            this.setState({ hoverObjectPointer: [info.x, info.y] });
          },
        }),
      ];

      return layers;
    }

    return [];
  }

  _deckClick(event) {
    if (isMobile) {
      if (!this.map) return;
      if (selectedStateId) {
        this.map.setFeatureState(
          { sourceLayer: 'original', source: 'trees', id: selectedStateId },
          { select: false }
        );
        selectedStateId = null;
      }
      const features = this.map.queryRenderedFeatures([event.x, event.y], {
        layers: ['trees'],
      });
      if (features.length > 0) {
        const { setDetailRouteWithListPath } = this.props;
        this._onClick(event.x, event.y, features[0]);

        store.setState({
          highlightedObject: features[0].properties['id'],
        });

        setDetailRouteWithListPath(features[0].properties.id);

        this.map.setFeatureState(
          { sourceLayer: 'original', source: 'trees', id: features[0].id },
          { select: true }
        );
        selectedStateId = features[0].id;
      }
    }
  }

  async selectTree(treeId: string): Promise<void> {
    const { setViewport } = this.props;
    store.setState({ selectedTreeState: 'LOADING' });
    const { getTree } = Actions(store);

    try {
      const { treeLastWatered, selectedTree } = await getTree(treeId);
      store.setState({ treeLastWatered });
      store.setState({ selectedTreeState: 'LOADED' });
      store.setState({ selectedTree });
      store.setState({
        highlightedObject:
          selectedTree && selectedTree.id ? selectedTree.id : undefined,
      });

      if (!selectedTree) return;

      setViewport([parseFloat(selectedTree.lat), parseFloat(selectedTree.lng)]);
    } catch (error) {
      console.error(error);
    }
  }

  _onClick(
    _x: number,
    _y: number,
    object: {
      geometry: {
        coordinates: [number, number];
      };
      properties: { id: string };
    }
  ) {
    const { setViewport, setDetailRouteWithListPath } = this.props;

    setViewport(object.geometry.coordinates);
    const id: string = object.properties.id;
    store.setState({
      highlightedObject: id,
    });
    setDetailRouteWithListPath(id);
  }

  setCursor(val) {
    if (val) {
      this.setState({ cursor: 'pointer' });
    } else {
      this.setState({ cursor: 'grab' });
    }
  }

  _onload(evt) {
    this.map = evt.target;

    const firstLabelLayerId = this.map
      .getStyle()
      .layers.find((layer: { type: string }) => layer.type === 'symbol').id;

    if (!isMobile) {
      this.map.addLayer(
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
      this.map.dragRotate.disable();

      // disable map rotation using touch rotation gesture
      this.map.touchZoomRotate.disableRotation();

      this.map.addSource('trees', {
        type: 'vector',
        url: 'mapbox://technologiestiftung.trees_s3',
        minzoom: 11,
        maxzoom: 20,
      });

      this.map.addLayer({
        id: 'trees',
        type: 'circle',
        source: 'trees',
        'source-layer': 'original',
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

    store.setState({ isTreeMapLoading: false });
  }

  _updateStyles(prevProps: MapType) {
    if (this.map && isMobile) {
      if (!this.props.treesVisible) {
        this.map.setLayoutProperty('trees', 'visibility', 'none');
      } else {
        this.map.setLayoutProperty('trees', 'visibility', 'visible');
      }
      if (prevProps.ageRange !== this.props.ageRange) {
        this.map.setPaintProperty('trees', 'circle-opacity', [
          'case',
          ['>=', ['get', 'age'], this.props.ageRange[0]],
          ['case', ['<=', ['get', 'age'], this.props.ageRange[1]], 1, 0],
          0,
        ]);
      }
      if (this.props.dataView === 'watered') {
        // TODO: check if there is a performance up for any of the two
        // ['in', ['get', 'id'], ['literal', [1, 2, 3]]]
        const filter = [
          'match',
          ['get', 'id'],
          this.props.communityDataWatered,
          true,
          false,
        ];
        this.map.setFilter('trees', filter);
      } else if (this.props.dataView === 'adopted') {
        const filter = [
          'match',
          ['get', 'id'],
          this.props.communityDataAdopted,
          true,
          false,
        ];
        this.map.setFilter('trees', filter);
      } else {
        this.map.setFilter('trees', null);
      }
    }
  }

  shouldComponentUpdate(prevProps: MapType) {
    return (
      prevProps.wateredTrees.length !== this.props.wateredTrees.length ||
      prevProps.highlightedObject !== this.props.highlightedObject ||
      prevProps.ageRange[0] !== this.props.ageRange[0] ||
      prevProps.ageRange[1] !== this.props.ageRange[1] ||
      prevProps.selectedTree?.id !== this.props.selectedTree?.id ||
      prevProps.viewport.latitude !== this.props.viewport.latitude ||
      prevProps.viewport.longitude !== this.props.viewport.longitude ||
      prevProps.viewport.zoom !== this.props.viewport.zoom ||
      prevProps.treesVisible !== this.props.treesVisible
    );
  }

  componentDidUpdate(prevProps: MapType) {
    if (this.map) {
      const mapProps = [
        'wateredTrees',
        'highlightedObject',
        'ageRange',
        'dataView',
        'selectedTree',
        'treesVisible',
      ];
      let changed = false;
      mapProps.forEach(prop => {
        if (prevProps[prop] !== this.props[prop]) {
          changed = true;
        }
      });
      if (changed) {
        this._updateStyles(prevProps);
      }
      if (
        prevProps.highlightedObject !== this.props.highlightedObject &&
        this.props.highlightedObject
      ) {
        this.selectTree(this.props.highlightedObject);
      }
    }
  }

  onViewStateChange(e: { viewState: ViewportType }) {
    this.props.setView(e.viewState);
  }

  render() {
    const {
      viewport,
      isTreeDataLoading,
      isNavOpen,
      setViewport,
      overlay,
    } = this.props;

    if (isTreeDataLoading) {
      return <span>Lade Berlins Baumdaten ...</span>;
    }

    return (
      <>
        {/* THis code below could be used to display some info for the pumps */}
        {isMobile === false &&
          this.state.isHovered === true &&
          this.state.hoverObjectPointer.length === 2 && (
            <HoverObject
              message={this.state.hoverObjectMessage}
              pointer={this.state.hoverObjectPointer}
            ></HoverObject>
          )}
        <DeckGL
          layers={this._renderLayers()}
          viewState={viewport}
          getCursor={() => {
            return this.state.cursor;
          }}
          onHover={info => {
            this.setCursor(info.layer);
          }}
          onClick={this._deckClick}
          onViewStateChange={e => this.onViewStateChange(e)}
          controller={true}
        >
          <StaticMap
            reuseMaps
            mapStyle='mapbox://styles/technologiestiftung/ckke3kyr00w5w17mytksdr3ro'
            preventStyleDiffing={true}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            onLoad={this._onload.bind(this)}
          >
            {!overlay && (
              <ControlWrapper isNavOpen={isNavOpen}>
                <GeolocateControl
                  positionOptions={{ enableHighAccuracy: true }}
                  trackUserLocation={isMobile ? true : false}
                  showUserLocation={true}
                  onGeolocate={posOptions => {
                    setViewport([
                      posOptions.coords.longitude,
                      posOptions.coords.latitude,
                    ]);
                  }}
                />
                <NavigationControl
                  onViewStateChange={e => this.onViewStateChange(e)}
                />
              </ControlWrapper>
            )}
          </StaticMap>
        </DeckGL>
      </>
    );
  }
}

export default connect<MapType, MapStateType, StoreProps, MapPropType>(
  state => ({
    data: state.data,
    rainGeojson: state.rainGeojson,
    dataView: state.dataView,
    pumps: state.pumps,
    pumpsVisible: state.pumpsVisible,
    isTreeDataLoading: state.isTreeDataLoading,
    isNavOpen: state.isNavOpen,
    overlay: state.overlay,
    wateredTrees: [wateredTreesSelector(state) || {}],
    highlightedObject: state.highlightedObject,
    ageRange: [state.ageRange[0], state.ageRange[1]],
    communityData: state.communityData,
    communityDataWatered: state.communityDataWatered,
    communityDataAdopted: state.communityDataAdopted,
    rainVisible: state.rainVisible,
    treesVisible: state.treesVisible,
    viewport: state.viewport,
    selectedTree: state.selectedTree,
  }),
  Actions
)(DeckGLMap);
