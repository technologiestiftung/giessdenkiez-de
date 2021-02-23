import { Store } from 'unistore';
import { RadolanDays, TreeLastWateredType } from './types';

export interface Generic {
  [key: string]: any;
}

export interface DailyWaterAmountsType {
  id: string;
  timestamp: Date;
  rainValue: number;
  wateringValue: number;
}

export interface WateredDayType {
  tree_id: string;
  time: string;
  uuid: string;
  amount: string;
  timestamp: string;
  username: string;
}

export interface SelectedTreeType {
  radolan_days: RadolanDays;
  radolan_sum: number;
  lat: string;
  lng: string;
  id: string;
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
  highlightedObject?: string;
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
  selectedTree: SelectedTreeType | undefined;
  treeLastWatered: TreeLastWateredType | undefined;
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
  isTreeDataLoading: boolean;
  isTreeMapLoading: boolean;
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
