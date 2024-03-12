import { expect, test } from "vitest";
import { useTreeAgeClassification } from "../../components/tree-detail/hooks/use-tree-age-classification";
import { useTreeWaterNeedsData } from "../../components/tree-detail/hooks/use-tree-water-needs-data";
import {
  TreeAgeClassification,
  TreeData,
  TreeWateringData,
} from "../../components/tree-detail/tree-types";

test("should calculate correct water needs for baby tree", () => {
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

  const treeData: TreeData = {
    id: "_22002d8af7",
    lat: "13.54072",
    lng: "52.57403",
    artdtsch: "Kulturapfel",
    artbot: "Malus domestica",
    gattungdeutsch: "APFEL",
    gattung: "MALUS",
    pflanzjahr: 2021,
    standalter: "2",
    baumhoehe: "3",
    bezirk: "Lichtenberg",
    eigentuemer: "Land Berlin",
    radolan_sum: 153,
    radolan_days: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 3, 1, 0, 2, 6, 9, 0, 1, 0, 4,
      4, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 5, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 12, 2, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 2, 2, 2, 1, 0, 0, 5, 2, 5,
      8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 2, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 7,
      7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
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

  const { treeAgeClassification } = useTreeAgeClassification(treeData);
  expect(treeAgeClassification).toBe(TreeAgeClassification.BABY);

  const {
    rainSum,
    rainPercentage,
    wateringSum,
    wateringPercentage,
    referenceWaterAmount,
    shouldBeWatered,
    waterParts,
  } = useTreeWaterNeedsData(treeData, waterings, treeAgeClassification);

  expect(rainSum).toBe(2);
  expect(wateringSum).toBe(100);
  expect(referenceWaterAmount).toBe(200);
  expect(rainPercentage).toBe(0.01);
  expect(wateringPercentage).toBe(0.99);
  expect(shouldBeWatered).toBe(false);
  expect(waterParts.map((p) => p.progress)).toEqual([0.01, 0.99]);
});
