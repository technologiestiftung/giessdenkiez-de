import { createAPIUrl, requests } from '..';
import { SelectedTreeType } from '../../common/interfaces';
import { TreeLastWateredType } from '../../common/types';

interface TreeLastWateredResponseType {
  data: TreeLastWateredType | undefined;
}

interface SelectedTreeResponseType {
  data: SelectedTreeType[];
}

const calcuateRadolan = (radolanDays: number): number => radolanDays / 10;

const parseSelectedTreeResponse = (
  selectedTreeResponse: SelectedTreeResponseType
): SelectedTreeType => {
  const selectedTree = selectedTreeResponse.data[0];
  return {
    ...selectedTree,
    radolan_days: selectedTree.radolan_days.map(calcuateRadolan),
    radolan_sum: calcuateRadolan(selectedTree.radolan_sum),
  };
};

const parseTreeLastWateredResponse = (
  treeLastWateredResponse: TreeLastWateredResponseType
): TreeLastWateredType => treeLastWateredResponse.data || [];

export const getTreeData = async (
  id: string
): Promise<{
  selectedTree?: SelectedTreeType;
  treeLastWatered: TreeLastWateredType;
}> => {
  const urlSelectedTree = createAPIUrl(`/get?queryType=byid&id=${id}`);
  const urlLastWatered = createAPIUrl(`/get?queryType=lastwatered&id=${id}`);

  const [resSelectedTree, resLastWatered] = await Promise.all([
    requests<SelectedTreeResponseType>(urlSelectedTree),
    requests<TreeLastWateredResponseType>(urlLastWatered),
  ]);
  const treeLastWatered = parseTreeLastWateredResponse(resLastWatered);

  return {
    selectedTree:
      resSelectedTree.data.length > 0
        ? parseSelectedTreeResponse(resSelectedTree as SelectedTreeResponseType)
        : undefined,
    treeLastWatered,
  };
};
