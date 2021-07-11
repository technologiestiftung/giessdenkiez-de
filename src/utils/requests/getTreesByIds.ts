import { Tree } from './../../common/interfaces';
import { createAPIUrl } from '../createAPIUrl';
import { requests } from '../requestUtil';

export const getTreesByIds = async (ids: string[]): Promise<Tree[]> => {
  const queryStr = ids.reduce(
    (acc: string, curr: string, idx: number, arr: string[]) =>
      idx + 1 === arr.length ? `${acc}${curr}` : `${acc}${curr},`,
    ''
  );

  const url = createAPIUrl(`/get/?queryType=treesbyids&tree_ids=${queryStr}`);
  const res = await requests<{ data: Tree[] }>(url);
  return res.data;
};
