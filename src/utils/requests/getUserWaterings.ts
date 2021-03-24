import { WateringType } from '../../common/interfaces';
import { createAPIUrl } from '../createAPIUrl';
import { requests } from '../requestUtil';

interface RawWateringType {
  amount: string;
  id: number;
  time: string;
  timestamp: string;
  tree_id: string;
  username: string;
  uuid: string;
}

const parseRawWatering = (rawWatering: RawWateringType): WateringType => ({
  id: `watering-${rawWatering.id}`,
  amount: parseFloat(rawWatering.amount),
  timestamp: rawWatering.timestamp,
  treeId: rawWatering.tree_id,
  username: rawWatering.username,
});

const parseRawWaterings = (rawWaterings: RawWateringType[]): WateringType[] =>
  rawWaterings.map(parseRawWatering);

export const getUserWaterings = async ({
  userId,
  token,
}: {
  userId: string;
  token: string;
}): Promise<WateringType[]> => {
  const urlWateredByUser = createAPIUrl(
    `/get?queryType=wateredbyuser&uuid=${userId}`
  );
  const res = await requests<{ data: RawWateringType[] }>(urlWateredByUser, {
    token,
  });
  if (!res?.data) return [];
  return parseRawWaterings(res.data);
};
