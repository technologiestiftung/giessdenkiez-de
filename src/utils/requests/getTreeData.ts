import { createAPIUrl } from '../createAPIUrl';
import { requests } from '../requestUtil';
import { RawWateringType, SelectedTreeType } from '../../common/interfaces';
import { parseRawWaterings } from '../parsing/parseRawWaterings';

interface TreeWateringsResponse {
  data: RawWateringType[] | undefined;
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
  waterings: RawWateringType[]
): SelectedTreeType => {
  const selectedTreeData = selectedTreeResponse.data[0];
  return {
    ...selectedTreeData,
    // lat/lng are inversed in the db this is why we switch them
    latitude: parseFloat(selectedTreeData.lng),
    longitude: parseFloat(selectedTreeData.lat),
    radolan_days: selectedTreeData.radolan_days.map(calcuateRadolan),
    radolan_sum: calcuateRadolan(selectedTreeData.radolan_sum),
    waterings: parseRawWaterings(waterings),
  };
};

export const getTreeData = async (
  id: string
): Promise<{
  selectedTreeData: SelectedTreeType | undefined;
}> => {
  const urlSelectedTree = createAPIUrl(`/get?queryType=byid&id=${id}`);
  const urlWaterings = createAPIUrl(`/get?queryType=lastwatered&id=${id}`);

  const [resSelectedTree, resWaterings] = await Promise.all([
    requests<SelectedTreeResponseType>(urlSelectedTree),
    requests<TreeWateringsResponse>(urlWaterings),
  ]);

  return {
    selectedTreeData:
      resSelectedTree.data.length > 0
        ? parseSelectedTreeResponse(
            resSelectedTree as SelectedTreeResponseType,
            resWaterings.data || []
          )
        : undefined,
  };
};
