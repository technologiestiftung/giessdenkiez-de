import createStore from 'unistore';

const Store = createStore({
  wateredTrees: [],
  includedTrees: {},
  adoptedTrees: [],
  wateredByUser: false,
  adoptedTrees: false,
  treesVisible: true,
  pumpsVisible: false,
  rainVisible: false,
  rainGeojson: null,
  adoptedTreesDetails: false,
  pumps: null,
  data: null,
  local: false,
  endpoints: {
    local: 'http://localhost:3000/',
    prod: 'https://tsb-tree-api-now-express-fabiandinklage.technologiestiftung1.now.sh',
  },
  tabActive: 'id-0',
  selectedTree: false,
  treeLastWatered: false,
  selectedTreeState: false,
  overlay: true,
  isLoading: true,
  AppState: 'watered',
  hoveredObject: false,
  viewport: {
    latitude: 52.500869,
    longitude: 13.419047,
    zoom: 11,
    maxZoom: 19,
    minZoom: 9,
    pitch: 45,
    bearing: 0
  },
})

export default Store;