import { Tree } from '../../common/interfaces';
import { createAPIUrl } from '../createAPIUrl';
import { requests } from '../requestUtil';
import { getTreesByIds } from './getTreesByIds';

export const getTreesAdoptedByUser = async ({
  userId,
  token,
}: {
  userId: string;
  token: string;
}): Promise<Tree[]> => {
  try {
    const urlAdoptedTreesIds = createAPIUrl(`/v3/get/adopted?uuid=${userId}`);
    const res = await requests<{ data: string[] }>(urlAdoptedTreesIds, {
      token,
    });
    if (!res?.data || res.data.length === 0) return [];
    const trees = await getTreesByIds(res.data);
    return trees;
  } catch (error) {
    console.error(error);
    return error;
  }
};
