import { RadolanDays } from './types';

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
  mapViewFilter: 'rain' | 'adopted' | 'watered';
  visibleMapLayer: 'rain' | 'trees' | 'pumps';
  isNavOpen: boolean;
  ageRange: number[];
  overlay: boolean;
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

//Map + Layers
//ViewState
export interface ViewState {
  bearing: number;
  latitude: number;
  longitude: number;
  maxZoom: number;
  minZoom: number;
  pitch: number;
  zoom: number;
}
//GeoJson
export interface FeatureCollection {
  type: string;
  features: TreeFeature[] | PumpFeature[] | RainFeature[];
}
export interface Feature {
  type: string;
  geometry: {
    type: string;
    coordinates: number[] | [number, number][][];
  };
  properties: {
    id: string | number;
  };
}
//Tree
export interface TreeFeature extends Feature {
  properties: {
    id: string;
    radolan_sum?: number;
    age: number;
  };
}
//Pump
export interface PumpFeature extends Feature {
  properties: {
    id: number;
    'addr:full': string;
    check_date: string;
    image: string;
    'pump:status': string;
    'pump:style': string;
  };
}
export interface HoveredPump {
  message: string;
  pointer: number[];
}
//Rain
export interface RainFeature extends Feature {
  properties: {
    id: number;
    data: number[];
  };
}
//Watered
export interface CommunityData {
  [key: string]: {
    watered: boolean;
    adopted: boolean;
  };
}