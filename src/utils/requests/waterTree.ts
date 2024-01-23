import { createAPIUrl } from '../createAPIUrl';
import { requests } from '../requestUtil';

export const waterTree = async ({
  id,
  amount,
  userId,
  username,
  token,
  timestamp,
}: {
  id: string;
  amount: number;
  userId: string;
  username: string;
  token: string;
  timestamp: Date;
}): Promise<void> => {
  try {
    const urlPostWatering = createAPIUrl(`/v3/post/water`);

    await requests<undefined, { method: 'POST'; body: string }>(
      urlPostWatering,
      {
        token,
        override: {
          method: 'POST',
          body: JSON.stringify({
            tree_id: id,
            amount,
            uuid: userId,
            username,
            timestamp,
          }),
        },
      }
    );
  } catch (error) {
    console.error(error);
    return error;
  }
};
