import { RawWateringType, WateringType } from '../../common/interfaces';
import { createAPIUrl } from '../createAPIUrl';
import { parseRawWaterings } from '../parsing/parseRawWaterings';
import { requests } from '../requestUtil';

export const getUserWaterings = async ({
  userId,
  token,
}: {
  userId: string;
  token: string;
}): Promise<WateringType[]> => {
  try {
    const urlWateredByUser = createAPIUrl(
      `/v3/get/wateredbyuser?uuid=${userId}`
    );
    const res = await requests<{ data: RawWateringType[] }>(urlWateredByUser, {
      token,
    });
    if (!res?.data) return [];
    return parseRawWaterings(res.data);
  } catch (error) {
    console.error(error);
    return error;
  }
};
