import history from '../history';
import { SelectedTreeType, StoreProps } from '../common/interfaces';

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

const selectTree = ({
  selectedTree,
  treeLastWatered,
}: {
  selectedTree: SelectedTreeType | undefined;
  treeLastWatered: StoreProps['treeLastWatered'];
}): {
  selectedTree?: SelectedTreeType;
  selectedTreeState: StoreProps['selectedTreeState'];
  treeLastWatered: StoreProps['treeLastWatered'];
} => {
  if (selectedTree?.id) {
    const nextLocation = `/search?location=${selectedTree.id}`;
    history.push(nextLocation);
  }
  return {
    treeLastWatered,
    selectedTree,
    selectedTreeState: 'LOADED',
  };
};

const allActions = {
  startLoading,
  stopLoading,
  selectTree,
  removeSelectedTree,
  setAgeRange,
  openOverlay,
  closeOverlay,
};

export type ActionsType = typeof allActions;
export default allActions;
