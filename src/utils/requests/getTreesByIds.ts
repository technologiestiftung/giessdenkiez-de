import { Tree } from './../../common/interfaces';
import { createAPIUrl } from '../createAPIUrl';
import { requests } from '../requestUtil';

export const getTreesByIds = async (ids: string[]): Promise<Tree[]> => {
  try {
    const queryStr = ids.reduce(
      (acc: string, curr: string, idx: number, arr: string[]) =>
        idx + 1 === arr.length ? `${acc}${curr}` : `${acc}${curr},`,
      ''
    );

    const url = createAPIUrl(`/v3/get/treesbyids?tree_ids=${queryStr}`);
    const res = await requests<{ data: Tree[] }>(url);
    return res.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
