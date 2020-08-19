import { Store } from 'unistore';

export interface Generic {
  [key: string]: any;
}

export interface StoreProps {
  wateredTrees: Generic[];
  includedTrees: Generic;
  adoptedTrees: Generic[];
  dataView: 'rain' | 'adopted' | 'watered' | string;
  communityData: Generic | null;
  communityDataAdopted?: Generic[];
  communityDataWatered?: Generic[];
  wateredByUser: boolean;
  treesVisible: boolean;
  cookiesAccepted: boolean;
  overlayIsVisible: boolean;
  legendExpanded: boolean;
  treeAdopted?: boolean;
  isNavOpen: boolean;
  pumpsVisible: boolean;
  highlightedObject: boolean;
  user: boolean;
  rainVisible: boolean;
  rainGeojson: null | null;
  adoptedTreesDetails: any;
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
    | 'NOT_FOUND'
    | 'WATERED';
  overlay: boolean;
  isLoading: boolean;
  AppState: string;
  hoveredObject: boolean;
  viewport: {
    latitude: number;
    longitude: number;
    zoom: number;
    maxZoom: number;
    minZoom: number;
    pitch: number;
    bearing: number;
  };
}

export interface IsTreeAdoptedProps {
  id: string;
  uuid: string;
  token: string;
  state: any;
  store: Store<StoreProps>;
  isAuthenticated?: boolean;
  signal?: AbortSignal;
  // isMounted: boolean;
}
