import { CommunityDataType } from '../../common/interfaces';
import { createAPIUrl } from '../createAPIUrl';
import { requests } from '../requestUtil';

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
    communityFlagsMap: {},
    wateredTreesIds: [],
    adoptedTreesIds: [],
  };

  if (!json.data) return defaultCommunityData;

  const newState = json.data.reduce(
    (acc: CommunityDataType, { tree_id: id, adopted, watered }) => ({
      communityFlagsMap: {
        ...acc.communityFlagsMap,
        [id]: {
          isAdopted: adopted === '1' ? true : false,
          isWatered: watered === '1' ? true : false,
        },
      },
      wateredTreesIds: [...acc.wateredTreesIds, id],
      adoptedTreesIds: [...acc.adoptedTreesIds, id],
    }),
    defaultCommunityData
  );

  return newState;
};
