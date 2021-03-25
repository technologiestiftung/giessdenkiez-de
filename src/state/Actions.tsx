import { StoreProps } from '../common/interfaces';

const setAgeRange = (
  ageRange: StoreProps['ageRange']
): Pick<StoreProps, 'ageRange'> => ({ ageRange });

const setVisibleMapLayer = (
  type: StoreProps['visibleMapLayer']
): Pick<StoreProps, 'visibleMapLayer'> => ({ visibleMapLayer: type });

const setMapViewFilter = (
  mapViewFilter: StoreProps['mapViewFilter']
): Pick<StoreProps, 'mapViewFilter'> => ({ mapViewFilter });

const startLoading = (): Pick<StoreProps, 'isTreeDataLoading'> => ({
  isTreeDataLoading: true,
});

const stopLoading = (): Pick<StoreProps, 'isTreeDataLoading'> => ({
  isTreeDataLoading: false,
});

const openOverlay = (): Pick<StoreProps, 'overlay' | 'isNavOpen'> => ({
  overlay: true,
  isNavOpen: false,
});

const closeOverlay = (): { overlay: StoreProps['overlay'] } => ({
  overlay: false,
});

const closeNav = (): { isNavOpen: StoreProps['isNavOpen'] } => ({
  isNavOpen: false,
});

const allActions = {
  startLoading,
  stopLoading,
  setAgeRange,
  openOverlay,
  closeOverlay,
  closeNav,
  setVisibleMapLayer,
  setMapViewFilter,
};

export type ActionsType = typeof allActions;
export default allActions;
