import history from '../history';
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

const removeSelectedTree = (): {
  selectedTreeId: StoreProps['selectedTreeId'];
  selectedTreeData: StoreProps['selectedTreeData'];
  selectedTreeState: StoreProps['selectedTreeState'];
} => ({
  selectedTreeId: undefined,
  selectedTreeData: undefined,
  selectedTreeState: 'LOADED',
});

const openOverlay = (): { overlay: StoreProps['overlay'] } => ({
  overlay: true,
});

const closeOverlay = (): { overlay: StoreProps['overlay'] } => ({
  overlay: false,
});

const selectTree: (
  selectedTreeId: StoreProps['selectedTreeId']
) => {
  selectedTreeId: StoreProps['selectedTreeId'];
  selectedTreeData: StoreProps['selectedTreeData'];
  selectedTreeState: StoreProps['selectedTreeState'];
} = selectedTreeId => {
  if (selectedTreeId) {
    const nextLocation = `/search?location=${selectedTreeId}`;
    history.push(nextLocation);
  }

  return {
    selectedTreeId,
    selectedTreeData: undefined,
    selectedTreeState: 'LOADING',
  };
};

const setSelectedTreeData = (
  selectedTreeData: StoreProps['selectedTreeData']
): {
  selectedTreeId: StoreProps['selectedTreeId'];
  selectedTreeData: StoreProps['selectedTreeData'];
  selectedTreeState: StoreProps['selectedTreeState'];
} => ({
  selectedTreeId: selectedTreeData?.id,
  selectedTreeData,
  selectedTreeState: 'LOADED',
});

const allActions = {
  startLoading,
  stopLoading,
  selectTree,
  setSelectedTreeData,
  removeSelectedTree,
  setAgeRange,
  openOverlay,
  closeOverlay,
};

export type ActionsType = typeof allActions;
export default allActions;
