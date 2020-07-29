import { isMobile } from 'react-device-detect';
import createStore from 'unistore';
import { IStore } from '../common/interfaces';

const store = createStore<IStore>({
  wateredTrees: [],
  includedTrees: {},
  // TODO: which one is it @fdnklg !!!!1!!11!!!
  adoptedTrees: [],
  dataView: 'rain',
  communityData: null,
  wateredByUser: false,
  treesVisible: true,
  cookiesAccepted: false,
  overlayIsVisible: true,
  legendExpanded: false,
  treeAdopted: false,
  isNavOpen: false,
  pumpsVisible: false,
  highlightedObject: false,
  user: false,
  rainVisible: false,
  rainGeojson: null,
  adoptedTreesDetails: false,
  csvdata: null,
  ageRange: [0, 320],
  pumps: null,
  data: null,
  local: process.env.NODE_ENV === 'production' ? false : true,
  endpoints: {
    local: process.env.ENDPOINT_DEV,
    prod: process.env.ENDPOINT_PROD,
  },
  tabActive: 'id-0',
  selectedTree: undefined,
  treeLastWatered: false,
  selectedTreeState: undefined,
  overlay: true,
  isLoading: true,
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
});

export default store;
