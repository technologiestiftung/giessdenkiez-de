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
  const urlAdoptedTreesIds = createAPIUrl(
    `/get?queryType=adopted&uuid=${userId}`
  );
  const res = await requests<{ data: string[] }>(urlAdoptedTreesIds, { token });
  if (!res?.data || res.data.length === 0) return [];
  const trees = await getTreesByIds(res.data);
  return trees;
};
