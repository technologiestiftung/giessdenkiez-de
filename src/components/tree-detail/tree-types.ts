export enum TreeAgeClassification {
  BABY = "BABY",
  JUNIOR = "JUNIOR",
  GROWNUP = "GROWNUP",
  SENIOR = "SENIOR",
  UNKNOWN = "UNKNOWN",
}

export interface TreeData {
  artbot: string;
  artdtsch: string;
  baumhoehe: string;
  bezirk: string;
  caretaker: string | null;
  eigentuemer: string | null;
  gattung: string;
  gattungdeutsch: string;
  id: string;
  lat: string;
  lng: string;
  pflanzjahr: number;
  radolan_days: number[];
  radolan_sum: number;
  standalter: string | null;
}

export interface TreeDataState {
  treeData: TreeData | undefined;
  treeAge: number | undefined;
  treeAgeClassification: TreeAgeClassification;
}

export interface TreeWateringData {
  amount: number;
  id: number;
  timestamp: string;
  tree_id: string;
  username: string;
}

export interface TreeWateringDataState {
  treeWateringData: TreeWateringData[];
  rainSum: number;
  wateringSum: number;
  rainPercentage: number;
  wateringPercentage: number;
  referenceWaterAmount: number;
  stillMissingWater: number;
  waterParts: ProgressPart[];
  treeAgeClassification: TreeAgeClassification;
  shouldBeWatered: boolean;
}

export interface ProgressPart {
  color: string;
  progress: number;
}

export interface PartialCircleProps {
  parts: ProgressPart[];
  needsWaterAmount: number;
  shouldBeWatered: boolean;
  treeAgeClassification: TreeAgeClassification;
}
