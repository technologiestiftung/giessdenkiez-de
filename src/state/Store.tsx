import { isMobile } from 'react-device-detect';
import createStore from 'unistore';
import { StoreProps } from '../common/interfaces';

const initialState = {
  wateredTrees: [],
  includedTrees: {},
  // TODO: which one is it @fdnklg !!!!1!!11!!!
  adoptedTrees: [],
  dataView: 'rain',
  communityData: null,
  wateredByUser: false,
  treesVisible: true,
  cookiesAccepted: false,
  legendExpanded: false,
  treeAdopted: undefined,
  isNavOpen: false,
  pumpsVisible: false,
  highlightedObject: undefined,
  user: false,
  rainVisible: false,
  rainGeojson: null,
  adoptedTreesDetails: false,
  csvdata: null,
  ageRange: [0, 320],
  pumps: null,
  data: null,
  tabActive: 'id-0',
  selectedTree: undefined,
  treeLastWatered: undefined,
  selectedTreeState: undefined,
  overlay: false,
  isTreeDataLoading: true,
  isTreeMapLoading: true,
  AppState: 'watered',
  hoveredObject: false,
  viewport: {
    latitude: 52.500869,
    longitude: 13.419047,
    zoom: isMobile ? 13 : 11,
    maxZoom: 19,
    minZoom: isMobile ? 11 : 9,
    pitch: isMobile ? 0 : 45,
    bearing: 0,
  },
};

const store = createStore<StoreProps>(initialState);
export default store;
