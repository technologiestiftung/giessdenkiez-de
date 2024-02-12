import createStore from 'unistore';
import { StoreProps } from '../common/interfaces';
import { getLocalStorageLanguage } from '../assets/local-storage';
import { Language } from '../assets/content-types';

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
