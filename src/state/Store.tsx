import createStore from 'unistore';
import { StoreProps } from '../common/interfaces';

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
};

const store = createStore<StoreProps>(initialState);
export default store;
