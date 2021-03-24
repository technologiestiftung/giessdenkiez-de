import { createAPIUrl } from '../createAPIUrl';
import { requests } from '../requestUtil';
import { SelectedTreeType, WateredDayType } from '../../common/interfaces';

interface TreeLastWateredResponseType {
  data: WateredDayType[] | undefined;
}

interface SelectedTreeApiResponse
  extends Omit<SelectedTreeType, 'latitude' | 'longitude'> {
  lat: string;
  lng: string;
}

interface SelectedTreeResponseType {
  data: SelectedTreeApiResponse[];
}

const calcuateRadolan = (radolanDays: number): number => radolanDays / 10;

const parseSelectedTreeResponse = (
  selectedTreeResponse: SelectedTreeResponseType,
  wateredDays: WateredDayType[]
): SelectedTreeType => {
  const selectedTreeData = selectedTreeResponse.data[0];
  return {
    ...selectedTreeData,
    // lat/lng are inversed in the db this is why we switch them
    latitude: parseFloat(selectedTreeData.lng),
    longitude: parseFloat(selectedTreeData.lat),
    radolan_days: selectedTreeData.radolan_days.map(calcuateRadolan),
    radolan_sum: calcuateRadolan(selectedTreeData.radolan_sum),
    wateredDays,
  };
};

const parseTreeLastWateredResponse = (
  treeLastWateredResponse: TreeLastWateredResponseType
): WateredDayType[] => treeLastWateredResponse.data || [];

export const getTreeData = async (
  id: string
): Promise<{
  selectedTreeData: SelectedTreeType | undefined;
}> => {
  const urlSelectedTree = createAPIUrl(`/get?queryType=byid&id=${id}`);
  const urlLastWatered = createAPIUrl(`/get?queryType=lastwatered&id=${id}`);

  const [resSelectedTree, resLastWatered] = await Promise.all([
    requests<SelectedTreeResponseType>(urlSelectedTree),
    requests<TreeLastWateredResponseType>(urlLastWatered),
  ]);
  const wateredDays = parseTreeLastWateredResponse(resLastWatered);

  return {
    selectedTreeData:
      resSelectedTree.data.length > 0
        ? parseSelectedTreeResponse(
            resSelectedTree as SelectedTreeResponseType,
            wateredDays
          )
        : undefined,
  };
};
