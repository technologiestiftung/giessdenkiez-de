import { createAPIUrl } from '../createAPIUrl';
import { requests } from '../requestUtil';

export const unadoptTree = async ({
  id,
  token,
  userId,
}: {
  id: string;
  token: string;
  userId: string;
}): Promise<void> => {
  const urlUnadopt = createAPIUrl(
    `/delete?tree_id=${id}&uuid=${userId}&queryType=unadopt`
  );

  await requests(urlUnadopt, {
    token,
    override: {
      method: 'DELETE',
      body: JSON.stringify({
        tree_id: id,
        uuid: userId,
        queryType: 'unadopt',
      }),
    },
  });
};
