import { OptionalUserDataType } from '../../common/interfaces';
import { getTreesAdoptedByUser } from './getTreesAdoptedByUser';
import { getUserWaterings } from './getUserWaterings';

export const getUserData = async ({
  userId,
  token,
}: {
  userId: string;
  token: string;
}): Promise<OptionalUserDataType | undefined> => {
  const res = await Promise.all([
    getUserWaterings({ userId, token }),
    getTreesAdoptedByUser({ userId, token }),
  ]);
  const [waterings, adoptedTrees] = res;

  return {
    waterings,
    adoptedTrees,
  };
};
