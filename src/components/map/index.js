import React from 'react';
import { connect } from 'unistore/react';
import Actions from '../../state/Actions';
import styled from 'styled-components';
import {
  StaticMap,
  Layer,
  /*GeolocateControl,*/ NavigationControl,
} from 'react-map-gl';
import DeckGL, { GeoJsonLayer, TileLayer } from 'deck.gl';
import {VectorTile} from '@mapbox/vector-tile';
import Protobuf from 'pbf';
import Store from '../../state/Store';
import { wateredTreesSelector } from '../../state/Selectors';
import {
  fetchAPI,
  createAPIUrl,
  interpolateColor,
  hexToRgb,
  // checkGeolocationFeature,
} from '../../utils';

const treeLayer = {
  id: 'trees',
  type: 'circle',
  source: 'mapbox://technologiestiftung.trees_v2',
  'source-layer': 'original',
  'paint': {
    'circle-radius': {
      'base': 1.75,
      'stops': [
      [12, 2],
      [22, 180]
      ]
    },
    'circle-color': 'red'
  }
};

const ControlWrapper = styled.div`
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

const MAPBOX_TOKEN = process.env.API_KEY;

class DeckGLMap extends React.Component {
  constructor(props) {
    super(props);

    this.bool = true;

    this.test = false;
    // this.geoLocationAvailable = false;

    // checkGeolocationFeature(
    //   () => {
    //     this.geoLocationAvailable = false;
    //     console.log('Geolocation access denied');
    //   },
    //   () => {
    //     this.geoLocationAvailable = true;
    //     console.log('Geolocation available');
    //   }
    // );
    this.state = {
      hoveredObject: null,
      data: null,
      included: null,
      cursor: 'grab',
      geoLocationAvailable: false,
    };

    this._onClick = this._onClick.bind(this);
    this._renderTooltip = this._renderTooltip.bind(this);
    this._getFillColor = this._getFillColor.bind(this);
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
        // new TileLayer({
        //   id: 'geojson',
        //   minZoom: 11,
        //   maxZoom: 17,
        //   getTileData: ({x, y, z}) => {
        //     const mapSource = `https://a.tiles.mapbox.com/v4/technologiestiftung.trees_v2/${z}/${x}/${y}.vector.pbf?access_token=pk.eyJ1IjoidGVjaG5vbG9naWVzdGlmdHVuZyIsImEiOiJjanZubXFzc3YxOTk3NGFxanNxMHdkc3Z0In0.cvnIEVF97kQljPfbB8nUZg`;
        //     return fetch(mapSource)
        //       .then(response => response.arrayBuffer())
        //       .then(buffer => {
        //         const tile = new VectorTile(new Protobuf(buffer));
        //         const features = [];
        //         for (const layerName in tile.layers) {
        //           const vectorTileLayer = tile.layers[layerName];
        //           for (let i = 0; i < vectorTileLayer.length; i++) {
        //             const vectorTileFeature = vectorTileLayer.feature(i);
        //             const feature = vectorTileFeature.toGeoJSON(x, y, z);
        //             features.push(feature);
        //           }
        //         }
        //         return features;
        //       });
        //   },
        //   // data: 'https://api.mapbox.com/v4/technologiestiftung.trees_v2/{z}/{x}/{y}.pbf?access_token=pk.eyJ1IjoidGVjaG5vbG9naWVzdGlmdHVuZyIsImEiOiJjanZubXFzc3YxOTk3NGFxanNxMHdkc3Z0In0.cvnIEVF97kQljPfbB8nUZg',
        //   opacity: 1,
        //   getLineWidth: info => {
        //     const { selectedTree } = this.props;
        //     const id = info.properties['id'];

        //     if (selectedTree) {
        //       if (id === selectedTree.id) {
        //         return 2;
        //       } else {
        //         return 0;
        //       }
        //     } else {
        //       return 0;
        //     }
        //   },
        //   getLineColor: [247, 105, 6, 255],
        //   visible: treesVisible,
        //   filled: true,
        //   parameters: {
        //     depthTest: false,
        //   },
        //   pickable: true,
        //   getRadius: 3,
        //   type: 'circle',
        //   pointRadiusMinPixels: 0.5,
        //   autoHighlight: true,
        //   highlightColor: [200, 200, 200, 255],
        //   transitions: {
        //     getFillColor: 500,
        //   },
        //   getFillColor: (info, i) => {
        //     const {
        //       // wateredTrees,
        //       // AppState,
        //       ageRange,
        //       dataView,
        //       communityData,
        //     } = this.props;
        //     const { properties } = info;
        //     const { id, radolan_sum, age } = properties;

        //     if (dataView === 'watered' && communityData[id]) {
        //       return communityData[id].watered
        //         ? [0, 0, 255, 200]
        //         : [0, 0, 0, 0];
        //     }

        //     if (dataView === 'adopted' && communityData[id]) {
        //       return communityData[id].adopted
        //         ? [255, 0, 0, 200]
        //         : [0, 0, 0, 0];
        //     }

        //     if (dataView === 'adopted' || dataView === 'watered') {
        //       return [0, 0, 0, 0];
        //     }

        //     if (age >= ageRange[0] && age <= ageRange[1]) {
        //       const interpolated = interpolateColor(radolan_sum);
        //       const hex = hexToRgb(interpolated);

        //       return hex;
        //     }

        //     if (Number.isNaN(age)) {
        //       // const interpolated = interpolateColor(radolan_sum);
        //       // const hex = hexToRgb(interpolated);
        //       return [200, 200, 200, 0];
        //       // return hex;
        //     }

        //     return [200, 200, 200, 0];
        //   },
        //   onClick: info => {
        //     const { setDetailRouteWithListPath } = this.props;
        //     this._onClick(info.x, info.y, info.object);

        //     if (info.object !== undefined) {
        //       Store.setState({
        //         highlightedObject: info.object.properties['id'],
        //       });
        //       setDetailRouteWithListPath(info.object.properties.id);
        //     }
        //   },
        //   updateTriggers: {
        //     getFillColor: [
        //       this.props.wateredTrees,
        //       this.props.highlightedObject,
        //       this.props.ageRange,
        //       this.props.dataView,
        //     ],
        //     getLineWidth: [this.props.selectedTree],
        //   },
        // }),
        new GeoJsonLayer({
          id: 'rain',
          data: rainGeojson,
          opacity: 0.5,
          visible: rainVisible,
          stroked: false,
          filled: true,
          extruded: true,
          wireframe: true,
          getElevation: 1,
          getFillColor: f => {
            const interpolated = interpolateColor(f.properties.data[0]);
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
          filled: false,
          extruded: true,
          wireframe: true,
          getElevation: 1,
          getLineColor: [44, 48, 59, 200],
          getFillColor: [0, 0, 0, 0],
          getRadius: 9,
          pointRadiusMinPixels: 4,
          pickable: true,
          lineWidthScale: 2,
          lineWidthMinPixels: 1,
        }),
      ];

      return layers;
    }
  }

  _onClick(x, y, object) {
    const { setViewport } = this.props;

    Store.setState({ selectedTreeState: 'LOADING' });

    setViewport(object.geometry.coordinates);

    const { state } = this.props;
    const id = object.properties.id;
    const url = createAPIUrl(state, `/get-tree?id=${id}`);
    const urlWatered = createAPIUrl(state, `/get-tree-last-watered?id=${id}`);

    fetchAPI(urlWatered)
      .then(r => {
        Store.setState({ treeLastWatered: r.data });
        return;
      })
      .catch(console.error);

    fetchAPI(url)
      .then(r => {
        Store.setState({ selectedTreeState: 'LOADED', selectedTree: r.data });
        return;
      })
      .catch(console.error);
  }

  _renderTooltip() {
    const { hoveredObject } = this.state;

    if (hoveredObject != null) {
      this.setState({ hoveredObject });
    }
  }

  setCursor(val) {
    if (val) {
      this.setState({ cursor: 'pointer' });
    } else {
      this.setState({ cursor: 'grab' });
    }
  }

  _getFillColor() {}

  _onload(evt) {
    const map = evt.target;
    // const insertBefore = map.getStyle();

    const firstLabelLayerId = map
      .getStyle()
      .layers.find(layer => layer.type === 'symbol').id;

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
  }

  handleDrag(e) {
    setTimeout(() => {
      this.props.setView(e.viewstate);
    }, 2000);
  }

  // componentDidMount() {
  //   checkGeolocationFeature(
  //     error => {
  //       console.error(error);
  //     },
  //     () => {
  //       this.setState({ ...this.state, geoLocationAvailable: true });
  //     }
  //   );
  // }
  render() {
    const {
      viewport,
      controller = true,
      baseMap = true,
      isLoading,
      isNavOpen,
      // setViewport,
      setView,
    } = this.props;

    if (isLoading) {
      return <span>Lade Berlins Baumdaten ...</span>;
    } else if (!isLoading) {
      return (
        <DeckGL
          layers={this._renderLayers()}
          initialViewState={viewport}
          viewState={viewport}
          getCursor={e => {
            return this.state.cursor;
          }}
          onHover={(info, event) => {
            this.setCursor(info.layer);
          }}
          onViewStateChange={e => this.handleDrag(e)}
          controller={controller}
        >
          {baseMap && (
            <StaticMap
              reuseMaps
              mapStyle='mapbox://styles/mapbox/light-v9'
              preventStyleDiffing={true}
              mapboxApiAccessToken={MAPBOX_TOKEN}
              onLoad={this._onload.bind(this)}
              zoom={3}
            >
              <Layer {...treeLayer} />
              <ControlWrapper isNavOpen={isNavOpen}>
                {/* {this.state.geoLocationAvailable === true && ( */}
                {/* <GeolocateControl
                  positionOptions={{ enableHighAccuracy: true }}
                  trackUserLocation={true}
                  onViewStateChange={e => setView(e.viewState)}
                  onGeolocate={options => {
                    console.log(options, 'in geolocateControl');
                  }}
                /> */}
                {/* )} */}
                <NavigationControl
                  onViewStateChange={e => setView(e.viewState)}
                />
              </ControlWrapper>
            </StaticMap>
          )}
        </DeckGL>
      );
    }
  }
}

export default connect(
  state => ({
    data: state.data,
    rainGeojson: state.rainGeojson,
    dataView: state.dataView,
    pumps: state.pumps,
    pumpsVisible: state.pumpsVisible,
    isLoading: state.isLoading,
    isNavOpen: state.isNavOpen,
    wateredTrees: wateredTreesSelector(state),
    state: state,
    highlightedObject: state.highlightedObject,
    ageRange: state.ageRange,
    communityData: state.communityData,
    user: state.user,
    AppState: state.AppState,
    rainVisible: state.rainVisible,
    treesVisible: state.treesVisible,
    viewport: state.viewport,
    selectedTree: state.selectedTree,
  }),
  Actions
)(DeckGLMap);
