import React, { Component } from "react";
import { connect } from "unistore/react";
import Actions from "../../state/Actions";
import { render } from "react-dom";
import { StaticMap, NavigationControl } from "react-map-gl";
import axios from "axios";
import DeckGL, { GeoJsonLayer, ScatterplotLayer } from "deck.gl";
import Store from "../../state/Store";
import { wateredTreesSelector } from "../../state/Selectors";
import {
  fetchAPI,
  createAPIUrl,
  interpolateColor,
  hexToRgb,
} from "../../utils";
import { colorFeature } from "./maputils";
import styled from "styled-components";
import { scaleThreshold } from "d3-scale";

const ControlWrapper = styled.div`
  position: absolute;
  z-index: 10000;
  left: 15px;
  bottom: 15px;
`;

const MAPBOX_TOKEN = process.env.API_KEY;

class DeckGLMap extends React.Component {
  constructor(props) {
    super(props);

    this.bool = true;

    this.test = false;

    this.state = {
      highlightedObject: 0,
      hoveredObject: null,
      data: null,
      included: null,
    };

    this._onClick = this._onClick.bind(this);
    this._renderTooltip = this._renderTooltip.bind(this);
    this._getFillColor = this._getFillColor.bind(this);
  }

  _renderLayers() {
    const {
      data,
      rainGeojson,
      treesVisible,
      pumpsVisible,
      rainVisible,
      pumps,
      csvdata
    } = this.props;

    var COLOR_RANGE = [
      [1, 152, 189],
      [73, 227, 206],
      [216, 254, 181],
      [254, 237, 177],
      [254, 173, 84],
      [209, 55, 78],
    ];

    const COLOR_SCALE = scaleThreshold()
      .domain([0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120])
      .range([
        [65, 182, 196],
        [127, 205, 187],
        [199, 233, 180],
        [237, 248, 177],
        // zero
        [255, 255, 204],
        [255, 237, 160],
        [254, 217, 118],
        [254, 178, 76],
        [253, 141, 60],
        [252, 78, 42],
        [227, 26, 28],
        [189, 0, 38],
        [128, 0, 38],
      ]);

    if (data && rainGeojson && pumps) {
      const layers = [
        new GeoJsonLayer({
          id: "geojson",
          data: data,
          opacity: 1,
          fp64: false,
          getLineWidth: (info) => {
            const { selectedTree } = this.props;
            const id = info.properties["id"];

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
          pickable: true,
          getRadius: 3,
          type: 'circle',
          pointRadiusMinPixels: .5,
          autoHighlight: true,
          highlightColor: [200, 200, 200, 255],
          transitions: {
            getFillColor: 500,
          },
          getFillColor: (info,i) => {
            const { wateredTrees, AppState } = this.props;
            const id = info.properties['id'];
            const sum = info.properties["radolan_sum"];

            const interpolated = interpolateColor(sum);
            const hex = hexToRgb(interpolated);

            return hex;
          },
          onClick: (info) => {
            const { setDetailRouteWithListPath } = this.props;
            this._onClick(info.x, info.y, info.object);

            if (info.object != undefined) {
              this.setState({
                highlightedObject: info.object.properties["id"],
              });
              setDetailRouteWithListPath(info.object.properties.id);
            }
          },
          updateTriggers: {
            getFillColor: [
              this.props.wateredTrees,
              this.state.highlightedObject,
            ],
            getLineWidth: [this.props.selectedTree],
          },
        }),
        new GeoJsonLayer({
          id: "rain",
          data: rainGeojson,
          opacity: 0.5,
          visible: rainVisible,
          stroked: false,
          filled: true,
          extruded: true,
          wireframe: true,
          getElevation: 1,
          getFillColor: (f) => {
            const interpolated = interpolateColor(f.properties.data[0]);
            const hex = hexToRgb(interpolated);
						return hex
          },
          pickable: true,
          // onHover: this._onHover
        }),
        new GeoJsonLayer({
          id: "pumps",
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
          // onHover: this._onHover
        }),
      ];

      // Store.setState({ isLoading: false });
      return layers;
    }
  }

  _getFillColor(info) {
    // console.log(info.properties.id);
    // console.log(info.object.properties['id'], this.props.wateredTrees)
    // return [102, 245, 173, 200];
  }

  _onClick(x, y, object) {
    const { setViewport, setView } = this.props;

    Store.setState({ selectedTreeState: "LOADING" });

    setViewport(object.geometry.coordinates);

    const { state, selectedTree } = this.props;
    const id = object.properties.id;
    const url = createAPIUrl(state, `/get-tree?id=${id}`);
    const urlWatered = createAPIUrl(state, `/get-tree-last-watered?id=${id}`);

    fetchAPI(urlWatered).then((r) => {
      Store.setState({ treeLastWatered: r.data });
    });

    fetchAPI(url).then((r) => {
      console.log("gettree", r);
      Store.setState({ selectedTreeState: "LOADED", selectedTree: r.data });
    });
  }

  _renderTooltip() {
    const { x, y, hoveredObject } = this.state;
    let data;

    if (hoveredObject != null) {
      data = hoveredObject.data.properties;
      this.setState({ hoveredObject });
    }
  }

  _onload(evt) {
    const map = evt.target;
    const insertBefore = map.getStyle();

    const firstLabelLayerId = map
      .getStyle()
      .layers.find((layer) => layer.type === "symbol").id;

    map.addLayer(
      {
        id: "3d-buildings",
        source: "composite",
        "source-layer": "building",
        filter: ["==", "extrude", "true"],
        type: "fill-extrusion",
        minzoom: 0,
        paint: {
          "fill-extrusion-color": "#FFF",
          "fill-extrusion-height": [
            "interpolate",
            ["linear"],
            ["zoom"],
            15,
            0,
            15.05,
            ["get", "height"],
          ],
          "fill-extrusion-base": [
            "interpolate",
            ["linear"],
            ["zoom"],
            15,
            0,
            15.05,
            ["get", "min_height"],
          ],
          "fill-extrusion-opacity": 0.3,
        },
      },
      firstLabelLayerId
    );
  }

  dispatchSetSelectedTreeData(val) {
    this.props.dispatch(setSelectedTreeData(val.data));
  }

  dispatchDataLoaded(state) {
    this.props.dispatch(setDataLoaded(state));
  }

  dispatchSetSelectedTreeDataLoading(val) {
    this.props.dispatch(setSelectedTreeDataLoading(val));
  }

  dispatchSetDataIncluded(val) {
    this.props.dispatch(setDataIncluded(val));
  }

  render() {
    const {
      viewport,
      controller = true,
      baseMap = true,
      dataLoaded,
      wateredTrees,
      wateredTreesFetched,
      isLoading,
    } = this.props;

    if (isLoading) {
      return <span>Lade Berlins Baumdaten ...</span>;
    } else if (!isLoading) {
      return (
        <DeckGL
          layers={this._renderLayers()}
          initialViewState={viewport}
          viewState={viewport}
          controller={controller}
        >
          {baseMap && (
            <StaticMap
              reuseMaps
              mapStyle="mapbox://styles/mapbox/light-v9"
              preventStyleDiffing={true}
              mapboxApiAccessToken={MAPBOX_TOKEN}
              onLoad={this._onload.bind(this)}
              zoom={3}
            ></StaticMap>
          )}

          {/* {this._renderTooltip} */}
        </DeckGL>
      );
    }
  }
}

export default connect(
  (state) => ({
    data: state.data,
    rainGeojson: state.rainGeojson,
    pumps: state.pumps,
    pumpsVisible: state.pumpsVisible,
    isLoading: state.isLoading,
    wateredTrees: wateredTreesSelector(state),
    state: state,
    AppState: state.AppState,
    rainVisible: state.rainVisible,
    treesVisible: state.treesVisible,
    viewport: state.viewport,
    selectedTree: state.selectedTree,
  }),
  Actions
)(DeckGLMap);
