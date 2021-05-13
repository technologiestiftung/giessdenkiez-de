import { requests } from '../requestUtil';
import { createAPIUrl } from '../createAPIUrl';
import { UserProfile } from '../../common/interfaces';

export const createUserProfile = async ({ token, userId, username, email, }: {
  userId: string;
  token: string;
  username: string;
  email: string;
}): Promise<UserProfile> => {
  const urlPostUserProfile = createAPIUrl(`/post`);

  const res = await requests<{data: UserProfile}, { method: 'POST'; body: string }>(
    urlPostUserProfile,
    {
      token,
      override: {
        method: 'POST',
        body: JSON.stringify({
          uuid: userId,
          username,
          email,
          queryType: 'user',
        }),
      },
    }
  );
  return res.data;
};