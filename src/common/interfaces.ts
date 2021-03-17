import { ViewportProps } from 'react-map-gl';
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

export interface SelectedTreeType extends Tree {
  radolan_days: RadolanDays;
  radolan_sum: number;
  lat: string;
  lng: string;
  id: string;
}

export interface ViewportType extends Partial<ViewportProps> {
  latitude: number;
  longitude: number;
  zoom: number;
  maxZoom: number;
  minZoom: number;
  pitch: number;
  bearing: number;
}
export interface StoreProps {
  wateredTrees: Generic[];
  includedTrees: Generic;
  adoptedTrees: Generic[];
  dataView: 'rain' | 'adopted' | 'watered' | string;
  communityData: Record<string, { adopted: boolean; watered: boolean }> | null;
  communityDataAdopted: string[];
  communityDataWatered: string[];
  wateredByUser: boolean;
  treesVisible: boolean;
  legendExpanded: boolean;
  treeAdopted?: boolean;
  isNavOpen: boolean;
  pumpsVisible: boolean;
  highlightedObject?: string;
  user: boolean;
  rainVisible: boolean;
  rainGeojson: Generic | null;
  adoptedTreesDetails: any;
  ageRange: number[];
  pumps: Generic | null;
  data: Generic | null;
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
  hoveredObject: boolean;
  viewport: ViewportType;
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
