import { useState } from 'react';
import { useAuth0 } from '../auth/auth0';
import { adoptTree } from '../requests/adoptTree';
import { unadoptTree } from '../requests/unadoptTree';
import { useAuth0Token } from './useAuth0Token';
import { useTreeData } from './useTreeData';
import { useUserData } from './useUserData';

export const useAdoptingActions = (
  treeId: string | null | undefined
): {
  adoptTree: () => Promise<void>;
  unadoptTree: () => Promise<void>;
  isBeingAdopted: boolean;
  isBeingUnadopted: boolean;
} => {
  const { user } = useAuth0();
  const token = useAuth0Token();
  const { invalidate: invalidateUserData } = useUserData();
  const { invalidate: invalidateTreeData } = useTreeData(treeId);
  const [isBeingAdopted, setIsBeingAdopted] = useState<boolean>(false);
  const [isBeingUnadopted, setIsBeingUnadopted] = useState<boolean>(false);

  return {
    isBeingAdopted,
    isBeingUnadopted,
    adoptTree: async (): Promise<void> => {
      if (!treeId || !user?.sub || !token) return;

      setIsBeingAdopted(true);
      await adoptTree({ id: treeId, token, userId: user.sub });
      setIsBeingAdopted(false);

      invalidateUserData();
      invalidateTreeData();
    },
    unadoptTree: async (): Promise<void> => {
      if (!treeId || !user?.sub || !token) return;

      setIsBeingUnadopted(true);
      await unadoptTree({ id: treeId, token, userId: user.sub });
      setIsBeingUnadopted(false);

      invalidateUserData();
      invalidateTreeData();
    },
  };
};
