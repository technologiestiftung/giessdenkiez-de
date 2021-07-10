import { requests } from '../requestUtil';
import { createAPIUrl } from '../createAPIUrl';

export const exportUserData = async ({
  token,
}: {
  token: string;
}): Promise<string> => {
  const apiUrl = createAPIUrl(
    `/get?queryType=user-export`
  );

  const res = await requests<{ data: string }>(apiUrl, { token });
  return res.data;
};