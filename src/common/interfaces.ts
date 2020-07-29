import { Store } from 'unistore';

export interface Generic {
  [key: string]: any;
}
export interface IStore {
  wateredTrees: Generic[];
  includedTrees: Generic;
  // TODO: which one is it @fdnklg !!!!1!!11!!!
  adoptedTrees: Generic[];
  dataView: 'rain' | 'adopted' | 'watered';
  communityData: Generic | null;
  communityDataAdopted?: Generic[];
  communityDataWatered?: Generic[];
  wateredByUser: boolean;
  treesVisible: boolean;
  cookiesAccepted: boolean;
  overlayIsVisible: boolean;
  legendExpanded: boolean;
  treeAdopted: boolean;
  isNavOpen: boolean;
  pumpsVisible: boolean;
  highlightedObject: boolean;
  user: boolean;
  rainVisible: boolean;
  rainGeojson: null | null;
  adoptedTreesDetails: boolean;
  csvdata: null;
  ageRange: number[];
  pumps: Generic | null;
  data: Generic | null;
  local: boolean;
  endpoints: {
    local: string | undefined;
    prod: string | undefined;
  };
  tabActive: string;
  selectedTree?: Generic;
  treeLastWatered: boolean;
  selectedTreeState?:
    | 'LOADED'
    | 'LOADING'
    | 'ADOPT'
    | 'ADOPTED'
    | 'WATERING'
    | 'FETCHED'
    | 'NOT_FOUND';
  overlay: boolean;
  isLoading: boolean;
  AppState: string;
  hoveredObject: boolean;
  viewport: {
    latitude: number;
    longitude: number;
    zoom: 13 | 11;
    maxZoom: 19;
    minZoom: 11 | 9;
    pitch: 0 | 45;
    bearing: number;
  };
}

export interface IsTreeAdoptedProps {
  id: string;
  uuid: string;
  token: string;
  state: any;
  store: Store<IStore>;
  isAuthenticated?: boolean;
  signal?: AbortSignal;
}
