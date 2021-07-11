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

const setMapFocusPoint = (
  mapFocusPoint: StoreProps['mapFocusPoint']
): Pick<StoreProps, 'mapFocusPoint'> => ({ mapFocusPoint });

const openOverlay = (): Pick<StoreProps, 'overlay' | 'isNavOpen'> => ({
  overlay: true,
  isNavOpen: false,
});

const closeOverlay = (): { overlay: StoreProps['overlay'] } => ({
  overlay: false,
});

const openNav = (): { isNavOpen: StoreProps['isNavOpen'] } => ({
  isNavOpen: true,
});

const closeNav = (): { isNavOpen: StoreProps['isNavOpen'] } => ({
  isNavOpen: false,
});

const allActions = {
  setMapFocusPoint,
  setAgeRange,
  openOverlay,
  closeOverlay,
  openNav,
  closeNav,
  setVisibleMapLayer,
  setMapViewFilter,
};

export type ActionsType = typeof allActions;
export default allActions;
