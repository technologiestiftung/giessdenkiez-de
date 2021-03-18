import { createAPIUrl, requests } from '..';
import { Tree } from '../../common/interfaces';

export const getTreesWateredByUser = async ({
  userId,
  token,
}: {
  userId: string;
  token: string;
}): Promise<Tree[]> => {
  const urlWateredByUser = createAPIUrl(
    `/get?queryType=wateredbyuser&uuid=${userId}`
  );
  const res = await requests<{ data: Tree[] }>(urlWateredByUser, { token });
  return res.data;
};
