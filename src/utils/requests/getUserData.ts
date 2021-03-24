import { UserDataType } from '../../common/interfaces';
import { getTreesAdoptedByUser } from './getTreesAdoptedByUser';
import { getUserWaterings } from './getUserWaterings';
import { getUserInfo } from './getUserInfo';

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
  ]);
  const [user, waterings, adoptedTrees] = res;
  if (!user) return undefined;

  return {
    id: userId,
    email: user.email || '',
    username: user.username || '',
    isVerified: user.email_verified || false,
    waterings,
    adoptedTrees,
  };
};
