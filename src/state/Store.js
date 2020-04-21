import createStore from 'unistore';

const Store = createStore({
  wateredTrees: [],
  includedTrees: {},
  adoptedTrees: [],
  wateredByUser: false,
  adoptedTrees: false,
  adoptedTreesDetails: false,
  data: null,
  local: false,
  endpoints: {
    local: 'http://localhost:3000/',
    prod: 'https://trees-express-now.fabiandinklage.now.sh',
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
    zoom: 16,
    maxZoom: 19,
    minZoom: 9,
    pitch: 45,
    bearing: 0
  },
})

export default Store;