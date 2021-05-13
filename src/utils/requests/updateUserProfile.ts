import { createAPIUrl } from '../createAPIUrl';
import { requests } from '../requestUtil';

export const updateUserProfile = async ({
  token,
  userId,
  preferedUserName,
}: {
  token: string;
  userId: string;
  preferedUserName: string;
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
          "name": "prefered_username",
          "value": preferedUserName
        }]
      }),
    },
  });
};
