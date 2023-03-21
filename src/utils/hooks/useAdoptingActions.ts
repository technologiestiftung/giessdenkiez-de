import { useState } from 'react';
import { adoptTree } from '../requests/adoptTree';
import { unadoptTree } from '../requests/unadoptTree';
import { useCommunityData } from './useCommunityData';
import { useTreeData } from './useTreeData';
import { useUserData } from './useUserData';
import { useSupabaseToken } from './useSupabaseToken';
import { useSupabaseUser } from './useSupabaseUser';

export const useAdoptingActions = (
  treeId: string | null | undefined
): {
  adoptTree: () => Promise<void>;
  unadoptTree: () => Promise<void>;
  isBeingAdopted: boolean;
  isBeingUnadopted: boolean;
} => {
  const user = useSupabaseUser();
  const token = useSupabaseToken();
  const { invalidate: invalidateUserData } = useUserData();
  const { invalidate: invalidateCommunityData } = useCommunityData();
  const { invalidate: invalidateTreeData } = useTreeData(treeId);
  const [isBeingAdopted, setIsBeingAdopted] = useState<boolean>(false);
  const [isBeingUnadopted, setIsBeingUnadopted] = useState<boolean>(false);

  return {
    isBeingAdopted,
    isBeingUnadopted,
    adoptTree: async (): Promise<void> => {
      if (!treeId || !user?.id || !token) return;

      setIsBeingAdopted(true);
      await adoptTree({ id: treeId, token, userId: user.id });
      setIsBeingAdopted(false);

      invalidateUserData();
      invalidateTreeData();
      invalidateCommunityData();
    },
    unadoptTree: async (): Promise<void> => {
      if (!treeId || !user?.id || !token) return;

      setIsBeingUnadopted(true);
      await unadoptTree({ id: treeId, token, userId: user.id });
      setIsBeingUnadopted(false);

      invalidateUserData();
      invalidateTreeData();
      invalidateCommunityData();
    },
  };
};
