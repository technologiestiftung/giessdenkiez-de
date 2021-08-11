import { RadolanDays } from './types';

export interface DailyWaterAmountsType {
  id: number;
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

interface FocusPointType {
  id: string;
  latitude: number;
  longitude: number;
  zoom?: number;
}

export interface StoreProps {
  mapViewFilter: 'rain' | 'adopted' | 'watered';
  mapWaterNeedFilter: number | null;
  visibleMapLayer: 'rain' | 'trees' | 'pumps';
  isNavOpen: boolean;
  ageRange: number[];
  overlay: boolean;
  mapFocusPoint: FocusPointType | null;
}

export interface Tree {
  id: string | null;
  lat?: string | null;
  lng?: string | null;
  artdtsch?: string | null;
  artbot?: string | null;
  gattungdeutsch?: string | null;
  gattung?: string | null;
  strname?: string | null;
  hausnr?: string | null;
  zusatz?: string | null;
  pflanzjahr?: string | null;
  standalter?: string | null; // this may be redundant now, but I'm not entirely sure
  age?: string;
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

export interface TreeGeojsonFeatureProperties
  extends Pick<Tree, 'id' | 'radolan_sum'> {
  age?: number;
}

type TreeId = string;
interface CommunityFlagsMapType {
  isAdopted: boolean;
  isWatered: boolean;
}
export interface CommunityDataType {
  communityFlagsMap: Record<TreeId, CommunityFlagsMapType> | null;
  adoptedTreesIds: TreeId[];
  wateredTreesIds: TreeId[];
}
