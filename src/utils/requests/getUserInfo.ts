import { requests } from '../requestUtil';
import { User } from 'auth0';

export const getUserInfo = async ({
  userId,
  token,
}: {
  userId: string;
  token: string;
}): Promise<User> => {
  const apiUrl = `${
    process.env.USER_DATA_API_URL
  }/api/user?userid=${encodeURIComponent(userId)}`;

  const res = await requests<{ data: User }>(apiUrl, { token });
  return res.data;
};
