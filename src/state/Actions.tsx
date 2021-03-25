import { StoreProps } from '../common/interfaces';

const setAgeRange = (
  payload: StoreProps['ageRange']
): {
  ageRange: StoreProps['ageRange'];
} => {
  return {
    ageRange: payload,
  };
};

const setVisibleMapLayer = (
  type: StoreProps['visibleMapLayer']
): { visibleMapLayer: StoreProps['visibleMapLayer'] } => {
  return {
    visibleMapLayer: type,
  };
};
function startLoading(): {
  isTreeDataLoading: true;
} {
  return { isTreeDataLoading: true };
}

function stopLoading(): {
  isTreeDataLoading: false;
} {
  return { isTreeDataLoading: false };
}

const openOverlay = (): {
  overlay: StoreProps['overlay'];
  isNavOpen: StoreProps['isNavOpen'];
} => ({
  overlay: true,
  isNavOpen: false,
});

const closeOverlay = (): { overlay: StoreProps['overlay'] } => ({
  overlay: false,
});

const closeNav = (): { isNavOpen: StoreProps['isNavOpen'] } => ({
  isNavOpen: false,
});

const changemapViewFilter = (
  filter: StoreProps['mapViewFilter']
): { mapViewFilter: StoreProps['mapViewFilter'] } => ({
  mapViewFilter: filter,
});

const allActions = {
  startLoading,
  stopLoading,
  setAgeRange,
  openOverlay,
  closeOverlay,
  closeNav,
  setVisibleMapLayer,
  changemapViewFilter,
};

export type ActionsType = typeof allActions;
export default allActions;
