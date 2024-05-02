// eslint-disable-next-line no-shadow
export enum TreeAgeClassification {
	BABY = "BABY",
	JUNIOR = "JUNIOR",
	SENIOR = "SENIOR",
	UNKNOWN = "UNKNOWN",
}

export interface TreeCoreData {
	art_bot: string;
	art_dtsch: string;
	baumhoehe: string;
	bezirk: string;
	caretaker: string | null;
	eigentuemer: string | null;
	gattung: string;
	gattung_deutsch: string;
	id: string;
	lat: string;
	lng: string;
	pflanzjahr: number;
	radolan_days: number[];
	radolan_sum: number;
	standalter: string | null;
}

export interface TreeWateringData {
	amount: number;
	id: number;
	timestamp: string;
	tree_id: string;
	username: string;
}

export interface AccumulatedTreeWateringData {
	[key: string]: number; // key is the tree id, value is the watering amount
}

export interface TreeWateringDataState {
	rainSum: number;
	wateringSum: number;
	rainPercentage: number;
	wateringPercentage: number;
	otherWateringPercentage: number;
	referenceWaterAmount: number;
	stillMissingWater: number;
	waterParts: ProgressPart[];
	shouldBeWatered: boolean;
	userWateringColor: string;
	otherWateringColor: string;
	rainColor: string;
}

export interface ProgressPart {
	color: string;
	progress: number;
}

export interface PartialCircleProps {
	parts: ProgressPart[];
	title: string;
	size: number;
}

export interface WaterCircleProps {
	parts: ProgressPart[];
	needsWaterAmount: number;
	shouldBeWatered: boolean;
	treeAgeClassification: TreeAgeClassification;
	size: number;
}

export interface TreeAgeClassificationState {
	treeAge: number | undefined;
	treeAgeClassification: TreeAgeClassification;
}
