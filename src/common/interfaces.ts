import { RadolanDays } from './types';

export interface Generic {
  [key: string]: any;
}
export interface DailyWaterAmountsType {
  id: string;
  timestamp: Date;
  rainValue: number;
  wateringValue: number;
}

export interface WateringType {
  amount: number;
  id: string;
  username: string;
  timestamp: string;
  treeId: string;
}

interface UserType {
  username: string;
  email: string;
}
export interface SelectedTreeType extends Tree {
  radolan_days: RadolanDays;
  radolan_sum: number;
  latitude: number;
  longitude: number;
  id: string;
  waterings: WateringType[] | undefined;
  isAdopted: boolean | undefined;
}
export interface StoreProps {
  dataView: 'rain' | 'adopted' | 'watered' | string;

  communityData: Record<string, { adopted: boolean; watered: boolean }> | null;
  communityDataAdopted: string[];
  communityDataWatered: string[];

  wateredTrees: string[];
  adoptedTrees: Generic[];

  treesVisible: boolean;
  pumpsVisible: boolean;
  rainVisible: boolean;

  isNavOpen: boolean;
  user?: UserType;
  rainGeojson: Generic | null;
  ageRange: number[];
  pumps: Generic | null;
  data: Generic | null;
  tabActive: string;
  overlay: boolean;
  isTreeDataLoading: boolean;
  hoveredObject: boolean;
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
  adopted?: boolean;
  watered?: boolean;
  radolan_sum?: number | null;
  radolan_days?: number[];
  geom?: string | null;
  standortnr?: string | null;
  kennzeich?: string | null;
  caretaker?: string | null;
}
