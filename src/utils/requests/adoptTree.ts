import { Tree } from './../../common/interfaces';
import { createAPIUrl } from '../createAPIUrl';
import { requests } from '../requestUtil';
import { isTreeAdopted } from './isTreeAdopted';

export const adoptTree = async ({
  id,
  token,
  userId,
}: {
  id: string;
  token: string;
  userId: string;
}): Promise<Tree> => {
  const url = createAPIUrl(`/post`);

  await requests(url, {
    token,
    override: {
      method: 'POST',
      body: JSON.stringify({ tree_id: id, uuid: userId, queryType: 'adopt' }),
    },
  });

  const res = await requests<{ data: Tree[] }>(
    createAPIUrl(`/get?&queryType=byid&id=${id}`)
  );
  const tree = res.data[0];

  tree.radolan_days = (tree.radolan_days || []).map(
    (d: number): number => d / 10
  ) as number[];

  tree.radolan_sum = (tree.radolan_sum || 0) / 10;

  const adopted = await isTreeAdopted({
    id,
    uuid: userId,
    token,
    isAuthenticated: !!userId,
  });

  return { ...tree, adopted };
};
