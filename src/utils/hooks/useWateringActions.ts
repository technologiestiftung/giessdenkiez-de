import { useState } from 'react';
import { waterTree } from '../requests/waterTree';
import { unwaterTree } from '../requests/unwaterTree';
import { useAuth0Token } from './useAuth0Token';
import { useCommunityData } from './useCommunityData';
import { useTreeData } from './useTreeData';
import { useUserData } from './useUserData';

export const useWateringActions = (
  treeId: string | null | undefined
): {
  waterTree: (amount: number, timestamp: Date) => Promise<void>;
  unwaterTree: (wateringId: number) => Promise<void>;
  isBeingWatered: boolean;
  isBeingUnwatered: boolean;
} => {
  const token = useAuth0Token();
  const { userData, invalidate: invalidateUserData } = useUserData();
  const { invalidate: invalidateCommunityData } = useCommunityData();
  const { invalidate: invalidateTreeData } = useTreeData(treeId);
  const [isBeingWatered, setIsBeingWatered] = useState<boolean>(false);
  const [isBeingUnwatered, setIsBeingUnwatered] = useState<boolean>(false);

  return {
    isBeingWatered,
    isBeingUnwatered,
    waterTree: async (amount: number, timestamp: Date): Promise<void> => {
      if (!userData || !token || !treeId || !timestamp) return;
      setIsBeingWatered(true);
      await waterTree({
        id: treeId,
        token,
        amount,
        timestamp,
        userId: userData.id,
        username: userData.username,
      });
      setIsBeingWatered(false);

      invalidateUserData();
      invalidateTreeData();
      invalidateCommunityData();
    },
    unwaterTree: async wateringId => {
      if (!userData || !token || !treeId || !wateringId) return;

      setIsBeingUnwatered(true);
      await unwaterTree({
        id: treeId,
        token,
        wateringId,
        userId: userData.id,
      });
      setIsBeingUnwatered(false);

      invalidateUserData();
      invalidateTreeData();
      invalidateCommunityData();
    },
  };
};
