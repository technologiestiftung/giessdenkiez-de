import { createAPIUrl } from '../createAPIUrl';
import { requests } from '../requestUtil';
import { WateredDayType } from '../../common/interfaces';

export const getTreesWateredByUser = async ({
  userId,
  token,
}: {
  userId: string;
  token: string;
}): Promise<WateredDayType[]> => {
  const urlWateredByUser = createAPIUrl(
    `/get?queryType=wateredbyuser&uuid=${userId}`
  );
  const res = await requests<{ data: WateredDayType[] }>(urlWateredByUser, {
    token,
  });
  return res.data;
};
