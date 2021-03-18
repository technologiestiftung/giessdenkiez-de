import { createAPIUrl } from '../createAPIUrl';
import { requests } from '../requestUtil';

interface CommunityDataType {
  communityData: Record<string, { adopted: boolean; watered: boolean }> | null;
  communityDataAdopted: string[];
  communityDataWatered: string[];
}

export const getCommunityData = async (): Promise<CommunityDataType> => {
  const fetchCommunityDataUrl = createAPIUrl(
    `/get?queryType=wateredandadopted`
  );

  const json = await requests<{
    data: {
      tree_id: string;
      adopted: '1' | '2';
      watered: '1' | '2';
    }[];
  }>(fetchCommunityDataUrl);

  const defaultCommunityData: CommunityDataType = {
    communityData: {},
    communityDataWatered: [],
    communityDataAdopted: [],
  };

  if (!json.data) return defaultCommunityData;

  const newState = json.data.reduce(
    (acc: CommunityDataType, { tree_id: id, adopted, watered }) => ({
      communityData: {
        ...acc.communityData,
        [id]: {
          adopted: adopted === '1' ? true : false,
          watered: watered === '1' ? true : false,
        },
      },
      communityDataWatered: [...acc.communityDataWatered, id],
      communityDataAdopted: [...acc.communityDataAdopted, id],
    }),
    defaultCommunityData
  );

  return newState;
};
