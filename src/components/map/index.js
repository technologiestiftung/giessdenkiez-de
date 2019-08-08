import React, {Component} from 'react';
import { connect } from "react-redux";
import {render} from 'react-dom';
import {StaticMap} from 'react-map-gl';
import axios from 'axios';
import DeckGL, {GeoJsonLayer} from 'deck.gl';

import { setSelectedTreeData, setSelectedTreeDataLoading, setSidebar } from '../../store/actions/index';

import { 
    dsv as d3Dsv,
} from 'd3';

// console

const MAPBOX_TOKEN = process.env.API_KEY;

const mapStateToProps = state => {
    return { 
        wateredTrees: state.wateredTrees,
        wateredTreesFetched: state.wateredTreesFetched,
        selectedTreeDataLoading: state.selectedTreeDataLoading
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
          hoveredObject: null,
          data: null,
          included: null
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
                    pointRadiusMinPixels: .75,
                    pointRadiusScale: 2,
                    getFillColor: (info) => {
                        const included = this.props.wateredTrees.includes(info.properties['id'])
                        return included ? [102, 245, 173, 200] : [200, 245, 173, 200]
                    },
                    onClick: (info) => {
                        this._onClick(info.x, info.y, info.object)
                    },
                    updateTriggers: {
                        getFillColor: [this.getWateredTrees, this.props.wateredTrees]
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
          console.log(data);
        }
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
      })
    }

    _requestDb(x, y, obj) {
        const id = obj.properties.id;
        const remote = "https://dshbp72tvi.execute-api.us-east-1.amazonaws.com/dev/trees";
        const local = "http://localhost:3000/trees"
        const url = `${remote}/${id}`;

        this.dispatchSetSelectedTreeDataLoading(true);
        console.log(this.props.selectedTreeDataLoading);
        
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

    dispatchSetSelectedTreeDataLoading(val) {
        this.props.dispatch(setSelectedTreeDataLoading(val));
    }

    render() {
        const {viewState, controller = true, baseMap = true} = this.props;

        console.log(this.props.wateredTreesFetched);

        if (!this.props.wateredTreesFetched) {
            return (
                <span>Fetching Data ..</span>
            )
        } else if (this.props.wateredTreesFetched) {
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
                    />
                    )}
            
                    {/* {this._renderTooltip} */}
                </DeckGL>
            );
        }
    

    }
    
}

export default connect(mapStateToProps)(DeckGLMap);