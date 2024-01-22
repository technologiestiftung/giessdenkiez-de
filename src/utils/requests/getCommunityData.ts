import { CommunityDataType } from '../../common/interfaces';
import { createAPIUrl } from '../createAPIUrl';
import { requests } from '../requestUtil';

interface RawRequestResponse<DataType> {
  data: DataType;
}

type WateredAndAdoptedResponseType = RawRequestResponse<
  {
    tree_id: string;
    adopted: number;
    watered: number;
  }[]
>;

export const getCommunityData = async (): Promise<CommunityDataType> => {
  try {
    const fetchWateredAndAdoptedUrl = createAPIUrl(`/v3/get/wateredandadopted`);

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
        const isAdopted = adopted !== 0;
        const isWatered = watered !== 0;

        const newCommunityFlagsMap = acc.communityFlagsMap || {};
        newCommunityFlagsMap[id] = { isAdopted, isWatered };

        const newWateredTreesIds = acc.wateredTreesIds;
        if (isWatered) newWateredTreesIds.push(id);

        const newAdoptedTreesIds = acc.adoptedTreesIds;
        if (isAdopted) newAdoptedTreesIds[id] = adopted;
        return {
          communityFlagsMap: newCommunityFlagsMap,
          wateredTreesIds: newWateredTreesIds,
          adoptedTreesIds: newAdoptedTreesIds,
        };
      },
      defaultCommunityData
    );
    return newState;
  } catch (error) {
    console.error(error);
    return error;
  }
};
