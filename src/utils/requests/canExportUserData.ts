import { requests } from '../requestUtil';
import { createAPIUrl } from '../createAPIUrl';

export const canExportUserData = async ({
  token,
}: {
  token: string;
}): Promise<boolean> => {
  const apiUrl = createAPIUrl(
    `/get?queryType=canexportusers`
  );

  const res = await requests<{ data: boolean }>(apiUrl, { token });
  return res.data;
};