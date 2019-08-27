import React, {Component} from 'react';
import { connect } from "react-redux";
import {render} from 'react-dom';
import {StaticMap} from 'react-map-gl';
import axios from 'axios';
import DeckGL, {GeoJsonLayer} from 'deck.gl';

import { setDataLoaded, setSelectedTreeData, setSelectedTreeDataLoading, setSidebar, setDataIncluded } from '../../store/actions/index';

import { 
    dsv as d3Dsv,
} from 'd3';

const MAPBOX_TOKEN = process.env.API_KEY;

const mapStateToProps = state => {
    return { 
        wateredTrees: state.wateredTrees,
        wateredTreesFetched: state.wateredTreesFetched,
        selectedTreeDataLoading: state.selectedTreeDataLoading,
        dataLoaded: state.dataLoaded,
        treeAgeData: state.treeAgeData,
        treeAgeDataUpdated: state.treeAgeDataUpdated,
        wateredTreeDataUpdated: state.wateredTreeDataUpdated,
        dataIncluded: state.dataIncluded,
        treeTypeDataUpdated: state.treeTypeDataUpdated,
        treeSizeDataUpdated: state.treeSizeDataUpdated,
        typeColors: state.typeColors
    };
};

export const INITIAL_VIEW_STATE = {
    latitude: 52.500869,
    longitude: 13.419047,
    zoom: 16,
    maxZoom: 19,
    minZoom: 9,
    pitch: 45,
    bearing: 0
};

class DeckGLMap extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
          highlightedObject: 0,
          hoveredObject: null,
          data: null,
          included: null,
        };

        this._onClick = this._onClick.bind(this);
        this._renderTooltip = this._renderTooltip.bind(this);
        this._createGeojson = this._createGeojson.bind(this);
        this._requestDb = this._requestDb.bind(this);
        this._getFillColor = this._getFillColor.bind(this);
    };

    _renderLayers() {
        const {data = this.state.data} = this.props;
    
        if (data != null) {
          
            return [
                new GeoJsonLayer({
                    id: 'geojson',
                    data,
                    opacity: 1,
                    stroked: false,
                    getRadius: 6,
                    filled: true,
                    pickable: true,
                    getLineColor: [0, 255, 255],
                    getRadius: 4,
                    pointRadiusMinPixels: 2,
                    autoHighlight: true,
                    highlightColor: [200, 200, 200, 255],
                    pointRadiusScale: 2,
                    transitions: {
                        getFillColor: 500,
                    },
                    getFillColor: (info) => {
                        let included = this.props.dataIncluded[info.properties['id']] != undefined ? this.props.dataIncluded[info.properties['id']].included : false;

                        if (this.props.wateredTreeDataUpdated && this.state.highlightedObject == info.properties['id']) {
                           return [150, 150, 150, 200] 
                        } else if (this.props.wateredTreeDataUpdated && included) {
                            return [102, 245, 173, 200]
                        } else if (this.props.wateredTreeDataUpdated && !included) {
                            return [164, 181, 222, 150]
                        }

                        if (this.props.treeAgeDataUpdated && this.state.highlightedObject == info.properties['id']) {
                            return [150, 150, 150, 200] 
                        } else if (this.props.treeAgeDataUpdated && included) {
                            return [102, 245, 173, 255];
                        } else if (this.props.treeAgeDataUpdated && !included) {
                            return [0, 0, 255, 0];
                        }

                        if (this.props.treeTypeDataUpdated  && this.state.highlightedObject == info.properties['id']) {
                            return [150, 150, 150, 200] 
                        } else if (this.props.treeTypeDataUpdated && included) {
                            let type = this.props.dataIncluded[info.properties['id']].type;
                            return this.props.typeColors[type].color;
                        } else if (this.props.treeTypeDataUpdated && !included) {
                            return [0, 0, 255, 0];
                        }

                        if (this.props.treeSizeDataUpdated  && this.state.highlightedObject == info.properties['id']) {
                            return [150, 150, 150, 200] 
                        } else if (this.props.treeSizeDataUpdated && included) {
                            return [102, 245, 173, 255]
                        } else if (this.props.treeSizeDataUpdated && !included) {
                            return [0, 0, 255, 0];
                        }

                    },
                    onClick: (info) => {
                        this._onClick(info.x, info.y, info.object)

                        if (info.object != undefined) {
                            this.setState({ highlightedObject: info.object.properties['id'] })
                        }
                    },
                    updateTriggers: {
                        getFillColor: [this.getWateredTrees, this.state.highlightedObject, this.props.dataIncluded]
                    }
                })
            ];
        }
    }

    _getFillColor(info) {
        // console.log(info.properties.id);
        // console.log(info.object.properties['id'], this.props.wateredTrees)

        // return [102, 245, 173, 200];
    }

    _createGeojson(data) {

        const geojson = {
            "type": "FeatureCollection",
            "features": []
        }
    
        data.forEach(tree => {
            const feature = {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [+tree.lat, +tree.lng]
                },
                "properties": {
                    "id": tree.id,
                }
            }
    
            geojson.features.push(feature);
        })
    
        this.setState({data: geojson});
      };

    _onClick(x, y, object) {
        this._requestDb(x, y, object);
    }

    _renderTooltip() {
        const {x, y, hoveredObject} = this.state;
        let data;
    
        if (hoveredObject != null) {
          data = hoveredObject.data.properties;
          this.setState({ hoveredObject })
          console.log(data);
        }
    }

    _onload(evt) {
		
		
		const map = evt.target;
		const insertBefore = map.getStyle();

		const firstLabelLayerId = map.getStyle().layers.find(layer => layer.type === 'symbol').id;
		
		map.addLayer({
			'id': '3d-buildings',
			'source': 'composite',
			'source-layer': 'building',
			'filter': ['==', 'extrude', 'true'],
			'type': 'fill-extrusion',
			'minzoom': 0,
			'paint': {
			'fill-extrusion-color': '#FFF',			 
			'fill-extrusion-height': [
			"interpolate", ["linear"], ["zoom"],
			15, 0,
			15.05, ["get", "height"]
			],
			'fill-extrusion-base': [
				"interpolate", ["linear"], ["zoom"], 15, 0, 15.05, ["get", "min_height"]
			],
			'fill-extrusion-opacity': .3
			}
			}, firstLabelLayerId);
	}

    
    componentDidMount() {
        const trees = require("../../../data/trees.csv");
        d3Dsv(",", trees, function(d) {
          return {
              id: d.id,
              lat: d.lat,
              lng: d.lng
          };
      }).then( (data) => {
          this._createGeojson(data);
          this.dispatchDataLoaded(true);
      })
    }

    _requestDb(x, y, obj) {
        const id = obj.properties.id;
        const remote = "https://dshbp72tvi.execute-api.us-east-1.amazonaws.com/dev/trees";
        const local = "http://localhost:3000/trees"
        const url = `${remote}/${id}`;

        this.dispatchSetSelectedTreeDataLoading(true);
        console.log('selected tree loading', this.props.selectedTreeDataLoading);
        
        axios.get(url)
        .then(res => {
            this.setState({x, y, hoveredObject: res});
            this.dispatchSetSelectedTreeData(res);
            this.dispatchSetSelectedTreeDataLoading(false);
            console.log(this.props.selectedTreeDataLoading);
                // this._setTooltip(res, obj.object.x, obj.object.y)
            })
            .catch(err => {
            console.log(err);
        })
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
        const {viewState, controller = true, baseMap = true} = this.props;

        if (!this.props.dataLoaded || !this.props.wateredTreesFetched) {
            return (
                <span>Lade Berlins Baumdaten ...</span>
            )
        } else if (this.props.wateredTreesFetched && this.props.dataLoaded) {
            return (
                <DeckGL
                    layers={this._renderLayers()}
                    initialViewState={INITIAL_VIEW_STATE}
                    viewState={viewState}
                    controller={controller}
                >
    
                    {baseMap && (
                    <StaticMap
                        reuseMaps
                        mapStyle="mapbox://styles/mapbox/light-v9"
                        preventStyleDiffing={true}
                        mapboxApiAccessToken={MAPBOX_TOKEN}
                        onLoad={this._onload.bind(this)}
                    />
                    )}
            
                    {/* {this._renderTooltip} */}
                </DeckGL>
            );
        }
    

    }
    
}

export default connect(mapStateToProps)(DeckGLMap);