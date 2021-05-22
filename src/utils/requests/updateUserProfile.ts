import { createAPIUrl } from '../createAPIUrl';
import { requests } from '../requestUtil';

export const updateUserProfile = async ({
  token,
  userId,
  name,
  value,
}: {
  token: string;
  userId: string;
  name: string;
  value?: string;
}): Promise<void> => {
  const urlChangeUserProfile = createAPIUrl(`/post`);

  return requests(urlChangeUserProfile, {
    token,
    override: {
      method: 'POST',
      body: JSON.stringify({
        queryType: "user-profile",
        uuid: userId,
        patches: [{
          "name": name,
          "value": value
        }]
      }),
    },
  });
};
