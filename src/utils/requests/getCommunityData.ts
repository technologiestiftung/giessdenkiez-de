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

type AdoptedResponseType =
  | undefined
  | RawRequestResponse<
      {
        tree_id: string;
        id: number;
        uuid: string;
      }[]
    >;

export const getCommunityData = async (
  token: string | undefined,
  uuid: string | undefined
): Promise<CommunityDataType> => {
  const fetchWateredAndAdoptedUrl = createAPIUrl(
    `/get?queryType=wateredandadopted`
  );
  const fetchAdoptedUrl = createAPIUrl(`/get?queryType=adopt&uuid=${uuid}`);

  const wateredAndAdoptedReq = requests<WateredAndAdoptedResponseType>(
    fetchWateredAndAdoptedUrl
  );

  const [wateredAndAdopted, adopted] = (await Promise.all(
    [
      wateredAndAdoptedReq,
      token ? requests<AdoptedResponseType>(fetchAdoptedUrl, { token }) : false,
    ].filter(Boolean)
  )) as [WateredAndAdoptedResponseType, AdoptedResponseType];
  const defaultCommunityData: CommunityDataType = {
    communityFlagsMap: {},
    wateredTreesIds: [],
    adoptedTreesIds: [],
  };

  if (!wateredAndAdopted.data) return defaultCommunityData;

  const newState = wateredAndAdopted.data.reduce(
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
