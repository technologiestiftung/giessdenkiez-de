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
  try {
    const urlUnadopt = createAPIUrl(`/v3/delete/unadopt`);

    await requests(urlUnadopt, {
      token,
      override: {
        method: 'DELETE',
        body: JSON.stringify({
          tree_id: id,
          uuid: userId,
        }),
      },
    });
  } catch (error) {
    console.error(error);
    return error;
  }
};
