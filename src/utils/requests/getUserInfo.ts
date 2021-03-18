import { requests } from '../requestUtil';
import { StoreProps } from '../../common/interfaces';

export const getUserInfo = async ({
  userId,
  token,
}: {
  userId: string;
  token: string;
}): Promise<StoreProps['user']> => {
  const apiUrl = `${
    process.env.USER_DATA_API_URL
  }/api/user?userid=${encodeURIComponent(userId)}`;

  const res = await requests<{ data: StoreProps['user'] }>(apiUrl, { token });
  return res.data;
};
