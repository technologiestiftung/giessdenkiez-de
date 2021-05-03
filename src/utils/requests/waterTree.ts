import { createAPIUrl } from '../createAPIUrl';
import { requests } from '../requestUtil';

export const waterTree = async ({
  id,
  amount,
  userId,
  username,
  token,
}: {
  id: string;
  amount: number;
  userId: string;
  username: string;
  token: string;
}): Promise<void> => {
  const urlPostWatering = createAPIUrl(
    `/post?tree_id=${id}&amount=${amount}&uuid=${userId}&token=${token}&username=${username}&queryType=water`
  );

  await requests<undefined, { method: 'POST'; body: string }>(urlPostWatering, {
    token,
    override: {
      method: 'POST',
      body: JSON.stringify({
        tree_id: id,
        amount,
        uuid: userId,
        username,
        queryType: 'water',
      }),
    },
  });
};
