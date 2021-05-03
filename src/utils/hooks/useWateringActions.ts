import { useState } from 'react';
import { waterTree } from '../requests/waterTree';
import { useAuth0Token } from './useAuth0Token';
import { useCommunityData } from './useCommunityData';
import { useTreeData } from './useTreeData';
import { useUserData } from './useUserData';

export const useWateringActions = (
  treeId: string | null | undefined
): {
  waterTree: (amount: number) => Promise<void>;
  isBeingWatered: boolean;
} => {
  const token = useAuth0Token();
  const { userData, invalidate: invalidateUserData } = useUserData();
  const { invalidate: invalidateCommunityData } = useCommunityData();
  const { invalidate: invalidateTreeData } = useTreeData(treeId);
  const [isBeingWatered, setIsBeingWatered] = useState<boolean>(false);

  return {
    isBeingWatered,
    waterTree: async (amount: number): Promise<void> => {
      if (!userData || !token || !treeId) return;

      setIsBeingWatered(true);
      await waterTree({
        id: treeId,
        token,
        amount,
        userId: userData.id,
        username: userData.username,
      });
      setIsBeingWatered(false);

      invalidateUserData();
      invalidateTreeData();
      invalidateCommunityData();
    },
  };
};
