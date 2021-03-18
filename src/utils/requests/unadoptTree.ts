import { createAPIUrl, requests } from '..';

export const unadoptTree = async (
  id: string,
  userId: string,
  token: string
): Promise<void> => {
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
