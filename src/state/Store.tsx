import createStore from 'unistore';
import { Language } from '../assets/content-types';
import { StoreProps } from '../common/interfaces';

const initialState: StoreProps = {
  mapViewFilter: 'rain',
  mapWaterNeedFilter: null,
  isNavOpen: true,
  visibleMapLayer: 'trees',
  ageRange: [0, 320],
  overlay: true,
  mapFocusPoint: null,
  mapHasLoaded: undefined,
  language: Language.de,
};

const store = createStore<StoreProps>(initialState);
export default store;
