import { createAPIUrl } from '../createAPIUrl';
import { requests } from '../requestUtil';
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
