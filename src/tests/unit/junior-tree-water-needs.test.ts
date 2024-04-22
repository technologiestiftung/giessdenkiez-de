import { expect, test } from "vitest";
import { useTreeAgeClassification } from "../../components/tree-detail/hooks/use-tree-age-classification";
import { useTreeWaterNeedsData } from "../../components/tree-detail/hooks/use-tree-water-needs-data";
import {
	TreeAgeClassification,
	TreeCoreData,
	TreeWateringData,
} from "../../components/tree-detail/tree-types";

test("should calculate correct water needs for junior tree", () => {
	const waterings: TreeWateringData[] = [
		{
			id: 1,
			timestamp: new Date().toISOString(),
			amount: 10,
			username: "test-user",
			tree_id: "_22002d8af7",
		},
		{
			id: 2,
			timestamp: new Date().toISOString(),
			amount: 20,
			username: "test-user",
			tree_id: "_22002d8af7",
		},
		{
			id: 3,
			timestamp: new Date().toISOString(),
			amount: 30,
			username: "test-user",
			tree_id: "_22002d8af7",
		},
		{
			id: 4,
			timestamp: new Date().toISOString(),
			amount: 40,
			username: "test-user",
			tree_id: "_22002d8af7",
		},
	];

	const treeData: TreeCoreData = {
		id: "_2100284266",
		lat: "13.57305",
		lng: "52.44338",
		artdtsch: "Spitz-Ahorn 'Summershade'",
		artbot: "Acer platanoides 'Summershade'",
		gattungdeutsch: "AHORN",
		gattung: "ACER",
		pflanzjahr: 2019,
		standalter: "4",
		baumhoehe: "7",
		bezirk: "Treptow-Köpenick",
		eigentuemer: "Land Berlin",
		radolan_sum: 191,
		radolan_days: [
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 4, 3, 1, 2, 7, 7, 1, 4, 2, 6,
			5, 2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 3, 1, 4, 0, 0, 0, 0, 0, 1, 0, 0, 2, 7, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2, 17, 8, 1, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 3, 0, 0, 0, 0, 0, 6, 5,
			11, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 7, 2, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
			4, 7, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 13, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0,
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
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 4, 5, 10,
		],
		caretaker: null,
	};

	const { treeAgeClassification, treeAge } = useTreeAgeClassification(
		treeData,
		new Date("2024-01-01T00:00+00:00"),
	);
	expect(treeAge).toBe(5);
	expect(treeAgeClassification).toBe(TreeAgeClassification.JUNIOR);

	const {
		rainSum,
		rainPercentage,
		wateringSum,
		wateringPercentage,
		referenceWaterAmount,
		shouldBeWatered,
		waterParts,
		stillMissingWater,
	} = useTreeWaterNeedsData(treeData, waterings, treeAgeClassification);

	expect(rainSum).toBe(21.1);
	expect(wateringSum).toBe(100);
	expect(referenceWaterAmount).toBe(200);
	expect(rainPercentage).toBe(0.10550000000000001);
	expect(wateringPercentage).toBe(0.5);
	expect(shouldBeWatered).toBe(true);
	expect(stillMissingWater).toBe(79);
	expect(waterParts.map((p) => p.progress)).toEqual([0.10550000000000001, 0.5]);
});
