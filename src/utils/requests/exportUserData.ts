import { requests } from '../requestUtil';
import { createAPIUrl } from '../createAPIUrl';
import { UserProfile } from '../../common/interfaces';

export const exportUserData = async ({
  token,
}: {
  token: string;
}): Promise<UserProfile[]> => {
  const apiUrl = createAPIUrl(
    `/get?queryType=user-export`
  );

  const res = await requests<{ data: UserProfile[] }>(apiUrl, { token });
  return res.data;
};