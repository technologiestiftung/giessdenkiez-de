import { QueryFunction, useQuery, useQueryClient } from 'react-query';
import { SelectedTreeType } from '../../common/interfaces';
import { getTreeData } from '../requests/getTreeData';
import { isTreeAdopted as isTreeAdoptedReq } from '../requests/isTreeAdopted';
import { useSupabaseToken } from './useSupabaseToken';
import { useSupabaseUser } from './useSupabaseUser';

const loadTree: QueryFunction<SelectedTreeType | undefined> = async ({
  queryKey,
}) => {
  const [, treeId] = queryKey;
  if (!treeId || typeof treeId !== 'string') return undefined;
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

  if (
    !treeId ||
    !token ||
    !userName ||
    typeof treeId !== 'string' ||
    typeof token !== 'string' ||
    typeof userName !== 'string'
  )
    return undefined;

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
  const user = useSupabaseUser();
  const token = useSupabaseToken();

  const treeDataParams = [`tree-${treeId}`, treeId];
  const { data: treeData, error } = useQuery<
    SelectedTreeType | undefined,
    Error
  >(treeDataParams, loadTree, {
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const isAdoptedParams = [`tree-${treeId}-adopted`, treeId, token, user?.id];
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
