import { CommunityDataType } from '../../common/interfaces';
import { createAPIUrl } from '../createAPIUrl';
import { requests } from '../requestUtil';

interface RawRequestResponse<DataType> {
  data: DataType;
}

type WateredAndAdoptedResponseType = RawRequestResponse<
  {
    tree_id: string;
    adopted: string;
    watered: string;
  }[]
>;

export const getCommunityData = async (): Promise<CommunityDataType> => {
  const fetchWateredAndAdoptedUrl = createAPIUrl(
    `/get?queryType=wateredandadopted`
  );

  const wateredAndAdopted = await requests<WateredAndAdoptedResponseType>(
    fetchWateredAndAdoptedUrl
  );

  const defaultCommunityData: CommunityDataType = {
    communityFlagsMap: {},
    wateredTreesIds: [],
    adoptedTreesIds: {},
  };

  if (!wateredAndAdopted.data) return defaultCommunityData;

  const newState = wateredAndAdopted.data.reduce(
    (acc: CommunityDataType, { tree_id: id, adopted, watered }) => {
      const isAdopted = adopted !== '0';
      const isWatered = watered !== '0';
      return {
        communityFlagsMap: {
          ...acc.communityFlagsMap,
          [id]: { isAdopted, isWatered },
        },
        wateredTreesIds: isWatered
          ? [...acc.wateredTreesIds, id]
          : acc.wateredTreesIds,
        adoptedTreesIds: isAdopted
          ? { ...acc.adoptedTreesIds, [id]: parseInt(adopted, 10) || 0 }
          : acc.adoptedTreesIds,
      };
    },
    defaultCommunityData
  );

  return newState;
};
