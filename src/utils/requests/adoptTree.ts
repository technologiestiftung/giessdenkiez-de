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
  try {
    const url = createAPIUrl(`/v3/post/adopt`);

    await requests(url, {
      token,
      override: {
        method: 'POST',
        body: JSON.stringify({ tree_id: id, uuid: userId }),
      },
    });

    const res = await requests<{ data: Tree[] }>(
      createAPIUrl(`/v3/get/byid?id=${id}`)
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
  } catch (error) {
    console.error(error);
    return error;
  }
};
