import { createAPIUrl, requests } from '..';
import { Tree } from '../../common/interfaces';

export const getTreesAdoptedByUser = async ({
  userId,
  token,
}: {
  userId: string;
  token: string;
}): Promise<Tree[]> => {
  const urlAdoptedTrees = createAPIUrl(`/get?queryType=adopted&uuid=${userId}`);
  const res = await requests<{ data: Tree[] }>(urlAdoptedTrees, { token });
  return res.data;
};
