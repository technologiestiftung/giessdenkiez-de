import { isMobile } from 'react-device-detect';
import createStore from 'unistore';
import { easeCubic as d3EaseCubic } from 'd3';
import { StoreProps } from '../common/interfaces';
import { FlyToInterpolator } from 'react-map-gl';

const initialState = {
  wateredTrees: [],
  adoptedTrees: [],
  dataView: 'rain',
  communityData: {},
  communityDataAdopted: [],
  communityDataWatered: [],
  wateredByUser: [],
  treesVisible: true,
  treeAdopted: undefined,
  isNavOpen: false,
  pumpsVisible: false,
  highlightedObject: undefined,
  user: undefined,
  rainVisible: false,
  rainGeojson: null,
  ageRange: [0, 320],
  pumps: null,
  data: null,
  tabActive: 'id-0',
  selectedTree: undefined,
  treeLastWatered: undefined,
  selectedTreeState: undefined,
  overlay: true,
  isTreeDataLoading: true,
  hoveredObject: false,
  viewport: {
    latitude: 52.500869,
    longitude: 13.419047,
    zoom: isMobile ? 13 : 11,
    maxZoom: 19,
    minZoom: isMobile ? 11 : 9,
    pitch: isMobile ? 0 : 45,
    bearing: 0,
    transitionDuration: 2000,
    transitionEasing: d3EaseCubic,
    transitionInterpolator: new FlyToInterpolator(),
  },
};

const store = createStore<StoreProps>(initialState);
export default store;
