import createStore from 'unistore';
import { StoreProps } from '../common/interfaces';

const initialState: StoreProps = {
  mapViewFilter: 'rain',
  isNavOpen: false,
  visibleMapLayer: 'trees',
  ageRange: [0, 320],
  overlay: true,
  mapFocusPoint: null,
};

const store = createStore<StoreProps>(initialState);
export default store;
