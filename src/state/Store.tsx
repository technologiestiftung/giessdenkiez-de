import createStore from 'unistore';
import { StoreProps } from '../common/interfaces';

const initialState: StoreProps = {
  wateredTrees: [],
  adoptedTrees: [],
  dataView: 'rain',
  communityData: {},
  communityDataAdopted: [],
  communityDataWatered: [],
  isNavOpen: false,
  visibleLayer: 'trees',
  user: undefined,
  rainGeojson: null,
  ageRange: [0, 320],
  pumps: null,
  data: null,
  selectedTreeLastWatered: undefined,
  overlay: true,
  isTreeDataLoading: true,
  hoveredObject: false,
};

const store = createStore<StoreProps>(initialState);
export default store;
