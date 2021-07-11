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
      adopted: string;
      watered: string;
    }[];
  }>(fetchCommunityDataUrl);

  const defaultCommunityData: CommunityDataType = {
    communityFlagsMap: {},
    wateredTreesIds: [],
    adoptedTreesIds: [],
  };

  if (!json.data) return defaultCommunityData;

  const newState = json.data.reduce(
    (acc: CommunityDataType, { tree_id: id, adopted, watered }) => {
      const item = acc[id];
      const isAdopted = item?.isAdopted || adopted !== '0';
      const isWatered = item?.isWatered || watered !== '0';
      return {
        communityFlagsMap: {
          ...acc.communityFlagsMap,
          [id]: { isAdopted, isWatered },
        },
        wateredTreesIds: isWatered
          ? [...acc.wateredTreesIds, id]
          : acc.wateredTreesIds,
        adoptedTreesIds: isAdopted
          ? [...acc.adoptedTreesIds, id]
          : acc.adoptedTreesIds,
      };
    },
    defaultCommunityData
  );

  return newState;
};
