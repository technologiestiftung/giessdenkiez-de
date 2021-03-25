import createStore from 'unistore';
import { StoreProps } from '../common/interfaces';

const initialState: StoreProps = {
  wateredTrees: [],
  adoptedTrees: [],
  mapViewFilter: 'rain',
  isNavOpen: false,
  visibleMapLayer: 'trees',
  user: undefined,
  rainGeojson: null,
  ageRange: [0, 320],
  pumps: null,
  data: null,
  overlay: true,
  isTreeDataLoading: true,
};

const store = createStore<StoreProps>(initialState);
export default store;
