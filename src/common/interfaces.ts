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
  rainGeojson: Generic | null;
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
  store: Store<StoreProps>;
  isAuthenticated?: boolean;
  signal?: AbortSignal;
  // isMounted: boolean;
}

export interface Tree {
  id: string | null;
  lat?: string | null;
  lng?: string | null;
  artdtsch?: string | null;
  artBot?: string | null;
  gattungdeutsch?: string | null;
  gattung?: string | null;
  strname?: string | null;
  hausnr?: string | null;
  zusatz?: string | null;
  pflanzjahr?: string | null;
  standalter?: string | null;
  kronedurch?: string | null;
  stammumfg?: string | null;
  type?: string | null;
  baumhoehe?: string | null;
  bezirk?: string | null;
  eigentuemer?: string | null;
  adopted?: null | any;
  watered?: null | any;
  radolan_sum?: number | null;
  radolan_days?: number[];
  geom?: string | null;
  standortnr?: string | null;
  kennzeich?: string | null;
  caretaker?: string | null;
}
