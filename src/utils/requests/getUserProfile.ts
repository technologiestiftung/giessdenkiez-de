import { requests } from '../requestUtil';
import { createAPIUrl } from '../createAPIUrl';
import { UserProfile } from '../../common/interfaces';

export const getUserProfile = async ({
  userId,
  token,
}: {
  userId: string;
  token: string;
}): Promise<UserProfile> => {
  const apiUrl = createAPIUrl(
    `/get?queryType=user-profile&uuid=${userId}`
  );

  const res = await requests<{ data: UserProfile }>(apiUrl, { token });
  return res.data;
};
