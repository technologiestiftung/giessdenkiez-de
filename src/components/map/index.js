import React, {Component} from 'react';
import { connect } from "unistore/react";
import {render} from 'react-dom';
import {StaticMap} from 'react-map-gl';
import axios from 'axios';
import DeckGL, { GeoJsonLayer } from 'deck.gl';
import Actions from '../../state/Actions';
import Store from '../../state/Store';
import { wateredTreesSelector } from '../../state/Selectors';
import { fetchAPI, createAPIUrl } from '../../state/utils';
import { colorFeature } from './maputils';

const MAPBOX_TOKEN = process.env.API_KEY;

class DeckGLMap extends React.Component {

	constructor(props) {
		super(props);

		this.bool = true;

		this.state = {
		  highlightedObject: 0,
		  hoveredObject: null,
		  data: null,
		  included: null,
		};

		this._onClick = this._onClick.bind(this);
		this._renderTooltip = this._renderTooltip.bind(this);
		// this._requestDb = this._requestDb.bind(this);
		this._getFillColor = this._getFillColor.bind(this);
	};

	_renderLayers() {
		const {data = this.state.data} = this.props;

		var COLOR_RANGE = [
			[1, 152, 189],
			[73, 227, 206],
			[216, 254, 181],
			[254, 237, 177],
			[254, 173, 84],
			[209, 55, 78]
		]

		const features = data.features;


		if (data != null) {
			return [
				new GeoJsonLayer({
					id: 'geojson',
					data,
					opacity: 1,
					stroked: true,
					getRadius: 12,
					getLineWidth: (info) => {
						const { selectedTree } = this.props;
						const id = info.properties['id'];

						if (selectedTree) {
							if (id === selectedTree.id) {
								return 4;
							} else {
								return 0
							}
						} else {
							return 0
						}

					},
					getElevation: 30,
					extruded: true,
					filled: true,
					pickable: true,
					getLineColor: [255, 132, 132, 255],
					getRadius: 2,
					pointRadiusMinPixels: 2,
					autoHighlight: true,
					highlightColor: [200, 200, 200, 255],
					pointRadiusScale: 2,
					transitions: {
						getFillColor: 500,
					},
					getFillColor: (info) => {
						const { wateredTrees, AppState } = this.props;
						const id = info.properties['id'];

						switch (AppState) {
							case 'watered':
								if (wateredTrees[id]) {
									return [55, 130, 222, 200]
								}
								break;

							case 'loggedIn':
								return [255, 0, 0, 200]
								break;

							default:
								break;
						}

						colorFeature(info, AppState);

						return [55, 222, 138, 200];
					},
					onClick: (info) => {
						const { setDetailRouteWithListPath } = this.props;
						this._onClick(info.x, info.y, info.object)

						if (info.object != undefined) {
							this.setState({ highlightedObject: info.object.properties['id'] })
							setDetailRouteWithListPath(info.object.properties.id);
						}
					},
					updateTriggers: {
						getFillColor: [this.props.wateredTrees, this.state.highlightedObject],
						getLineWidth: [this.props.selectedTree]
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

	_onClick(x, y, object) {

		const { setViewport } = this.props;

		Store.setState({ selectedTreeState: 'LOADING' });

		setViewport(object.geometry.coordinates);

		const { state, selectedTree } = this.props;
		const id = object.properties.id;
		const url = createAPIUrl(state, `/get-tree?id=${id}`);

		const res = fetchAPI(url)
			.then(r => { Store.setState({ selectedTreeState: 'LOADED', selectedTree: r.data }); });
	}

	_renderTooltip() {
		const {x, y, hoveredObject} = this.state;
		let data;

		if (hoveredObject != null) {
		  data = hoveredObject.data.properties;
		  this.setState({ hoveredObject })
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

	componentDidUpdate() {
		// const { wateredTrees, includedTrees, wateredTreesData } = this.props;
		// const { status, data } = wateredTrees.datum;

		// if (status === 'SUCCESS' && includedTrees) {
		//     console.log(this.props)
		// }
		// console.log(this.props)
	}

	// _requestDb(x, y, obj) {
	//     const id = obj.properties.id;
	//     const remote = "https://dshbp72tvi.execute-api.us-east-1.amazonaws.com/dev/trees";
	//     const local = "http://localhost:3000/trees"
	//     const url = `${remote}/${id}`;

	//     this.dispatchSetSelectedTreeDataLoading(true);
	//     console.log('selected tree loading', this.props.selectedTreeDataLoading);

	//     axios.get(url)
	//     .then(res => {
	//         this.setState({x, y, hoveredObject: res});
	//         this.dispatchSetSelectedTreeData(res);
	//         this.dispatchSetSelectedTreeDataLoading(false);
	//         console.log(this.props.selectedTreeDataLoading);
	//             // this._setTooltip(res, obj.object.x, obj.object.y)
	//         })
	//         .catch(err => {
	//         console.log(err);
	//     })
	// }

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
		const {viewport, controller = true, baseMap = true, dataLoaded, wateredTrees, wateredTreesFetched, isLoading } = this.props;

		if (isLoading) {
			return (
				<span>Lade Berlins Baumdaten ...</span>
			)
		} else if (!isLoading) {
			return (
				<DeckGL
					layers={this._renderLayers()}
					initialViewState={viewport}
					viewState={ viewport }
					controller={ controller }
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

export default connect(state => ({
  data: state.data,
  isLoading: state.isLoading,
	wateredTrees: wateredTreesSelector(state),
	state: state,
	AppState: state.AppState,
	viewport: state.viewport,
	selectedTree: state.selectedTree,
}), Actions)(DeckGLMap);