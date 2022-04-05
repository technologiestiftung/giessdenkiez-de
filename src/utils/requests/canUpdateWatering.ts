import { requests } from '../requestUtil';
import { createAPIUrl } from '../createAPIUrl';

export const canUpdateWatering = async ({
  token,
}: {
  token: string;
}): Promise<boolean> => {
  const apiUrl = createAPIUrl(
    `/get?queryType=canupdatewatering`
  );

  const res = await requests<{ data: boolean }>(apiUrl, { token });
  return res.data;
};