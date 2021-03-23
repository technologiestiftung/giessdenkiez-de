import { StoreProps } from '../../common/interfaces';
import { getTreesAdoptedByUser } from './getTreesAdoptedByUser';
import { getTreesWateredByUser } from './getTreesWateredByUser';
import { getUserInfo } from './getUserInfo';

export const getUserData = async ({
  userId,
  token,
}: {
  userId: string;
  token: string;
}): Promise<{
  user: StoreProps['userData'];
  wateredByUser: StoreProps['wateredByUser'];
  adoptedTrees: StoreProps['adoptedTrees'];
}> => {
  const res = await Promise.all([
    getUserInfo({ userId, token }),
    getTreesWateredByUser({ userId, token }),
    getTreesAdoptedByUser({ userId, token }),
  ]);
  const [user, wateredByUser, adoptedTrees] = res;
  return { user, wateredByUser, adoptedTrees };
};
