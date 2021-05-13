import { UserDataType } from '../../common/interfaces';
import { getTreesAdoptedByUser } from './getTreesAdoptedByUser';
import { getUserWaterings } from './getUserWaterings';
import { getUserInfo } from './getUserInfo';
import { getUserProfile } from './getUserProfile';

export const getUserData = async ({
  userId,
  token,
}: {
  userId: string;
  token: string;
}): Promise<UserDataType | undefined> => {
  const res = await Promise.all([
    getUserInfo({ userId, token }),
    getUserWaterings({ userId, token }),
    getTreesAdoptedByUser({ userId, token }),
    getUserProfile({ userId, token }),
  ]);
  const [user, waterings, adoptedTrees, userProfile] = res;
  if (!user) return undefined;

  return {
    id: userId,
    email: user.email || '',
    username: user.username || '',
    isVerified: user.email_verified || false,
    waterings,
    adoptedTrees,
    userProfile,
  };
};
