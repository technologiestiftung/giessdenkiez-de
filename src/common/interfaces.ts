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

export interface RawWateringType {
  amount: string;
  id: number;
  time: string;
  timestamp: string;
  tree_id: string;
  username: string;
  uuid: string;
}

export interface WateringType {
  amount: number;
  id: string;
  username: string;
  timestamp: string;
  treeId: string;
}
export interface UserDataType {
  id: string;
  email: string;
  username: string;
  isVerified: boolean;
  waterings: WateringType[];
  adoptedTrees: Tree[];
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
  adoptedTrees: Pick<Tree, 'id'>[];

  visibleMapLayer: 'rain' | 'trees' | 'pumps';

  isNavOpen: boolean;
  user?: UserDataType;
  rainGeojson: Generic | null;
  ageRange: number[];
  pumps: Generic | null;
  data: Generic | null;
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
  adopted?: boolean | null;
  watered?: boolean;
  radolan_sum?: number | null;
  radolan_days?: number[];
  geom?: string | null;
  standortnr?: string | null;
  kennzeich?: string | null;
  caretaker?: string | null;
}
