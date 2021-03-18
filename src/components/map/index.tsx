import React from 'react';
import { connect } from 'unistore/react';
import { Map as MapboxMap, MapboxGeoJSONFeature } from 'mapbox-gl';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';
import { StaticMap, GeolocateControl, NavigationControl } from 'react-map-gl';
import DeckGL, { GeoJsonLayer } from 'deck.gl';

import Actions from '../../state/Actions';
import store from '../../state/Store';
import { wateredTreesSelector } from '../../state/Selectors';
import { interpolateColor, hexToRgb } from '../../utils/colorUtil';
import { HoverObject } from './HoverObject';
import { StoreProps, ViewportType } from '../../common/interfaces';
import { pumpToColor } from './colors';
import { getUrlQueryParameter } from '../../utils/queryUtil';
import { getTreeData } from '../../utils/requests/getTreeData';
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

let map: MapboxMap | null = null;
let selectedStateId: string | number | undefined = undefined;

const MAPBOX_TOKEN = process.env.API_KEY;

interface DeckGLPropType {
  data: StoreProps['data'];
  rainGeojson: StoreProps['rainGeojson'];
  treesVisible: StoreProps['treesVisible'];
  pumpsVisible: StoreProps['pumpsVisible'];
  rainVisible: StoreProps['rainVisible'];
  pumps: StoreProps['pumps'];
  selectedTree: StoreProps['selectedTree'];
  highlightedObject: StoreProps['highlightedObject'];
  ageRange: StoreProps['ageRange'];
  dataView: StoreProps['dataView'];
  communityData: StoreProps['communityData'];
  wateredTrees: StoreProps['wateredTrees'];
  communityDataWatered: StoreProps['communityDataWatered'];
  communityDataAdopted: StoreProps['communityDataAdopted'];
  viewport: StoreProps['viewport'];
  isTreeDataLoading: StoreProps['isTreeDataLoading'];
  isNavOpen: StoreProps['isNavOpen'];
  overlay: StoreProps['overlay'];
  setDetailRouteWithListPath: (id: string) => void;
  setViewport: (viewport: [number, number]) => void;
  setView: (viewport: ViewportType) => void;
  extendView: (viewport: Partial<ViewportType>) => void;
}

interface DeckGLStateType {
  isHovered: boolean;
  hoverObjectPointer: [number, number];
  hoverObjectMessage: string;
  cursor: 'grab' | 'pointer';
  geoLocationAvailable: boolean;
  isTreeMapLoading: boolean;
}

class DeckGLMap extends React.Component<DeckGLPropType, DeckGLStateType> {
  constructor(props: DeckGLPropType) {
    super(props);

    this.state = {
      isHovered: false,
      hoverObjectPointer: [0, 0],
      hoverObjectMessage: '',
      cursor: 'grab',
      geoLocationAvailable: false,
      isTreeMapLoading: true,
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
          getLineWidth: info => {
            const { selectedTree } = this.props;
            const id = info.properties['id'];

            if (selectedTree) {
              if (id === selectedTree.id) {
                return 2;
              } else {
                return 0;
              }
            } else {
              return 0;
            }
          },
          getLineColor: [247, 105, 6, 255],
          visible: treesVisible,
          filled: true,
          parameters: {
            depthTest: false,
          },
          pickable: true,
          getRadius: 3,
          type: 'circle',
          pointRadiusMinPixels: 0.5,
          autoHighlight: true,
          highlightColor: [200, 200, 200, 255],
          transitions: {
            getFillColor: 500,
          },
          getFillColor: info => {
            const { ageRange, dataView, communityData } = this.props;
            const { properties } = info;
            const { id, radolan_sum, age } = properties;

            if (dataView === 'watered' && communityData && communityData[id]) {
              return communityData[id].watered
                ? [53, 117, 177, 200]
                : [0, 0, 0, 0];
            }

            if (dataView === 'adopted' && communityData && communityData[id]) {
              return communityData[id].adopted
                ? [0, 128, 128, 200]
                : [0, 0, 0, 0];
            }

            if (dataView === 'adopted' || dataView === 'watered') {
              return [0, 0, 0, 0];
            }

            if (age >= ageRange[0] && age <= ageRange[1]) {
              const interpolated = interpolateColor(radolan_sum);
              const hex = hexToRgb(interpolated);

              return hex;
            }

            if (Number.isNaN(age)) {
              return [200, 200, 200, 0];
            }

            return [200, 200, 200, 0];
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
              this.props.highlightedObject,
              this.props.ageRange,
              this.props.dataView,
            ],
            getLineWidth: [this.props.selectedTree],
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
          getFillColor: f => {
            /**
             * Apparently DWD 1 is not 1ml but 0.1ml
             * We could change this in the database, but this would mean,
             * transferring 625.000 "," characters, therefore,
             * changing it client-side makes more sense.
             */
            const interpolated = interpolateColor(f.properties.data[0] / 10);
            const hex = hexToRgb(interpolated);
            return hex;
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
          getFillColor: pumpToColor,
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
    if (isMobile && map) {
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
      if (features.length > 0) {
        const { setDetailRouteWithListPath } = this.props;
        this._onClick(event.x, event.y, features[0]);

        if (!features[0].properties) return;

        store.setState({
          highlightedObject: features[0].properties['id'],
        });

        setDetailRouteWithListPath(features[0].properties.id);

        map.setFeatureState(
          { sourceLayer: 'original', source: 'trees', id: features[0].id },
          { select: true }
        );
        selectedStateId = features[0].id;
      }
    }
  }

  async selectTree(treeId: string): Promise<void> {
    const { extendView } = this.props;
    store.setState({ selectedTreeState: 'LOADING' });

    try {
      const treeData = await getTreeData(treeId);
      const { treeLastWatered, selectedTree } = treeData;
      store.setState({
        treeLastWatered,
        selectedTree,
        selectedTreeState: 'LOADED',
        highlightedObject: (selectedTree && selectedTree.id) || undefined,
      });

      if (!selectedTree) return;

      extendView({
        longitude: parseFloat(selectedTree.lat),
        latitude: parseFloat(selectedTree.lng),
        zoom: 19,
      });
    } catch (error) {
      console.error(error);
    }
  }

  _onClick(_x: number, _y: number, object: MapboxGeoJSONFeature) {
    const { setViewport, setDetailRouteWithListPath } = this.props;
    const { coordinates } = (object.geometry as unknown) as {
      coordinates: [number, number];
    };

    if (!coordinates || !Array.isArray(coordinates)) return;
    setViewport(coordinates);
    const id: string = object.properties?.id;
    if (!id) return;
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

  _onload(evt: { target: MapboxMap }) {
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
        url: 'mapbox://technologiestiftung.trees_s3',
        minzoom: 11,
        maxzoom: 20,
      });

      map.addLayer({
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

    this.setState({ isTreeMapLoading: false });
  }

  _updateStyles(prevProps: DeckGLPropType) {
    if (map && isMobile) {
      if (!this.props.treesVisible) {
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
        map.setFilter('trees', filter);
      } else if (this.props.dataView === 'adopted') {
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

  componentDidUpdate(prevProps: DeckGLPropType) {
    if (map) {
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

  componentDidMount() {
    const treeId = getUrlQueryParameter('location');

    if (treeId) {
      store.setState({ overlay: false });
      this.selectTree(treeId);
    }
  }

  render() {
    const {
      viewport,
      isTreeDataLoading,
      isNavOpen,
      setViewport,
      setView,
      overlay,
    } = this.props;

    if (isTreeDataLoading) {
      return <span>Lade Berlins Baumdaten ...</span>;
    }
    return (
      <>
        {/* This code below could be used to display some info for the pumps */}
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
          initialViewState={viewport}
          viewState={viewport}
          getCursor={() => this.state.cursor}
          onHover={({ layer }) => this.setCursor(layer)}
          onClick={this._deckClick}
          onViewStateChange={e => setView(e.viewState)}
          controller
        >
          <StaticMap
            reuseMaps
            mapStyle='mapbox://styles/technologiestiftung/ckke3kyr00w5w17mytksdr3ro'
            preventStyleDiffing={true}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            onLoad={this._onload.bind(this)}
            width='100%'
            height='100%'
          >
            {!overlay && (
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
                    setViewport([longitude, latitude]);
                  }}
                />
                <NavigationControl
                  onViewStateChange={e => setView(e.viewState)}
                />
              </ControlWrapper>
            )}
          </StaticMap>
        </DeckGL>
      </>
    );
  }
}

export default connect(
  state => ({
    ...state,
    wateredTrees: wateredTreesSelector(state),
    state: state,
  }),
  Actions
)(DeckGLMap);
