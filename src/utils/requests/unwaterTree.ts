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
  const urlUnwater = createAPIUrl(
    `/delete/unwater?tree_id=${id}&watering_id=${wateringId}&uuid=${userId}`
  );

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
};
