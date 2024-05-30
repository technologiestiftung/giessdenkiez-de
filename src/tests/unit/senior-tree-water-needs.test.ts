import { expect, test } from "vitest";
import { useTreeAgeClassification } from "../../components/tree-detail/hooks/use-tree-age-classification";
import { useTreeWaterNeedsData } from "../../components/tree-detail/hooks/use-tree-water-needs-data";
import {
	TreeAgeClassification,
	TreeCoreData,
	TreeWateringData,
} from "../../components/tree-detail/tree-types";

test("should calculate correct water needs for senior tree", () => {
	const waterings: TreeWateringData[] = [
		{
			id: 3,
			timestamp: new Date().toISOString(),
			amount: 30,
			username: "test-user",
			gml_id: "00008100:002d8af7",
		},
		{
			id: 4,
			timestamp: new Date().toISOString(),
			amount: 40,
			username: "test-user",
			gml_id: "00008100:002d8af7",
		},
	];

	const treeData: TreeCoreData = {
		gml_id: "00008100:002d8af7",
		lat: "13.46627",
		lng: "52.48992",
		art_dtsch: "Winter-Linde",
		art_bot: "Tilia cordata",
		gattung_deutsch: "LINDE",
		gattung: "TILIA",
		pflanzjahr: 1852,
		standalter: "171",
		baumhoehe: "22",
		bezirk: "Treptow-Köpenick",
		eigentuemer: "Land Berlin",
		radolan_sum: 214,
		geom: {
			coordinates: [13.46627, 52.48992],
		},
		radolan_days: [
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 4, 2, 3, 5, 7, 7, 0, 3, 5, 7,
			3, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 5, 1, 5, 0, 0, 0, 0, 0, 1, 0, 0, 5, 9, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2, 17, 4, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 2, 0, 1, 0, 0, 4, 6, 4,
			13, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 9, 2, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			5, 6, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 14, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 80, 20, 1, 4, 5, 10,
		],
		caretaker: null,
	};

	const { treeAgeClassification, treeAge } = useTreeAgeClassification(
		treeData,
		new Date("2024-01-01T00:00+00:00"),
	);
	expect(treeAge).toBe(172);
	expect(treeAgeClassification).toBe(TreeAgeClassification.SENIOR);

	const {
		rainSum,
		rainPercentage,
		wateringSum,
		wateringPercentage,
		otherWateringPercentage,
		referenceWaterAmount,
		shouldBeWatered,
		waterParts,
		stillMissingWater,
	} = useTreeWaterNeedsData(treeData, waterings, treeAgeClassification);

	expect(rainSum).toBe(33.4);
	expect(wateringSum).toBe(70);
	expect(referenceWaterAmount).toBe(300);
	expect(rainPercentage).toBe(0.11133333333333333);
	expect(wateringPercentage).toBe(0.23333333333333334);
	expect(otherWateringPercentage).toBe(0.6553333333333333);
	expect(shouldBeWatered).toBe(false);
	expect(stillMissingWater).toBe(197);
	expect(waterParts.map((p) => p.progress)).toEqual([
		0.11133333333333333, 0.23333333333333334, 0.6553333333333333,
	]);
});
