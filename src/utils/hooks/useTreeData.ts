import { QueryFunction, useQuery, useQueryClient } from 'react-query';
import { SelectedTreeType } from '../../common/interfaces';
import { useAuth0 } from '@auth0/auth0-react';
import { getTreeData } from '../requests/getTreeData';
import { isTreeAdopted as isTreeAdoptedReq } from '../requests/isTreeAdopted';
import { useAuth0Token } from './useAuth0Token';

const loadTree: QueryFunction<SelectedTreeType | undefined> = async ({
  queryKey,
}) => {
  const [, treeId] = queryKey;
  if (!treeId) return undefined;
  const data = await getTreeData(treeId);
  if (!data.selectedTreeData) {
    throw new Error('Baumdaten nicht gefunden. Probier einen anderen ...');
  }
  return data.selectedTreeData;
};

const isTreeAdopted: QueryFunction<boolean | undefined> = async ({
  queryKey,
}) => {
  const [, treeId, token, userName] = queryKey;

  if (!treeId || !token || !userName) return undefined;

  const isAdopted = await isTreeAdoptedReq({
    id: treeId,
    uuid: userName,
    token,
    isAuthenticated: !!userName,
  });
  return isAdopted;
};

export const useTreeData = (
  treeId: string | undefined | null
): {
  treeData: SelectedTreeType | undefined;
  error: Error | null;
  invalidate: () => void;
} => {
  const queryClient = useQueryClient();
  const { user } = useAuth0();
  const token = useAuth0Token();

  const treeDataParams = [`tree-${treeId}`, treeId];
  const { data: treeData, error } = useQuery<
    SelectedTreeType | undefined,
    Error
  >(treeDataParams, loadTree, {
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const isAdoptedParams = [`tree-${treeId}-adopted`, treeId, token, user?.sub];
  const { data: isAdopted, error: adoptedError } = useQuery<
    boolean | undefined,
    Error
  >(isAdoptedParams, isTreeAdopted, {
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return {
    treeData: treeData && {
      ...treeData,
      isAdopted,
    },
    error: error || adoptedError,
    invalidate: () => {
      queryClient.invalidateQueries(treeDataParams);
      queryClient.invalidateQueries(isAdoptedParams);
    },
  };
};
