import { createAPIUrl } from '../createAPIUrl';
import { requests } from '../requestUtil';

type UnwaterTreeSignature = (params: {
  id: string;
  token: string;
  userId: string;
  wateringId: number;
}) => Promise<void>;

export const unwaterTree: UnwaterTreeSignature = async ({
  id,
  token,
  userId,
  wateringId,
}) => {
  try {
    const urlUnwater = createAPIUrl(`/v3/delete/unwater`);

    await requests(urlUnwater, {
      token,
      override: {
        method: 'DELETE',
        body: JSON.stringify({
          tree_id: id,
          watering_id: wateringId,
          uuid: userId,
        }),
      },
    });
  } catch (error) {
    console.error(error);
    return error;
  }
};
