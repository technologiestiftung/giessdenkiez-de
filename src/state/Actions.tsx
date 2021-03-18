import history from '../history';
import { StoreProps, ViewportType } from '../common/interfaces';

const setAgeRange = (
  _state: StoreProps,
  payload: StoreProps['ageRange']
): {
  ageRange: StoreProps['ageRange'];
} => {
  return {
    ageRange: payload,
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

function setViewport(
  state: StoreProps,
  [latitude, longitude]: [number, number]
): { viewport: ViewportType } {
  // TODO: lat long are reversed in the database
  // that is why we need to switch them here.
  return {
    viewport: {
      ...state.viewport,
      latitude: longitude,
      longitude: latitude,
      transitionDuration: 2000,
    },
  };
}

function setView(
  _state: StoreProps,
  payload: ViewportType
): { viewport: ViewportType } {
  return {
    viewport: {
      ...payload,
      transitionDuration: 0,
    },
  };
}

function extendView(
  state: StoreProps,
  payload: Partial<ViewportType>
): { viewport: ViewportType } {
  return {
    viewport: {
      ...state.viewport,
      ...payload,
      transitionDuration: 2000,
    },
  };
}

const removeSelectedTree = (): {
  selectedTree: boolean;
  selectedTreeState: boolean;
} => ({
  selectedTree: false,
  selectedTreeState: false,
});

const openOverlay = (): { overlay: StoreProps['overlay'] } => ({
  overlay: true,
});

const closeOverlay = (): { overlay: StoreProps['overlay'] } => ({
  overlay: false,
});

const setDetailRouteWithListPath = (_state: StoreProps, treeId: string) => {
  const nextLocation = `/search?location=${treeId}`;
  history.push(nextLocation);
};

const allActions = {
  startLoading,
  stopLoading,
  setDetailRouteWithListPath,
  setViewport,
  setView,
  extendView,
  removeSelectedTree,
  setAgeRange,
  openOverlay,
  closeOverlay,
};

export type ActionsType = typeof allActions;
export default (): ActionsType => allActions;
