import { QueryFunction, useQuery, useQueryClient } from 'react-query';
import { useLocation } from 'react-router';
import { SelectedTreeType } from '../../common/interfaces';
import { useAuth0 } from '../auth/auth0';
import { getTreeData } from '../requests/getTreeData';
import { isTreeAdopted as isTreeAdoptedReq } from '../requests/isTreeAdopted';

const loadTree: QueryFunction<SelectedTreeType | undefined> = async ({
  queryKey,
}) => {
  const [_key, treeId] = queryKey;
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
  const [_key, treeId, getTokenSilently, isAuthenticated, userName] = queryKey;

  if (!treeId || !getTokenSilently || !isAuthenticated || !userName)
    return undefined;

  const token = await getTokenSilently();
  const isAdopted = await isTreeAdoptedReq({
    id: treeId,
    uuid: userName,
    token,
    isAuthenticated,
  });
  return isAdopted;
};

const parseTreeIdParam = (path: string) => {
  const [location, treeId] = path
    .replace(/\?.*$/g, '')
    .split('/')
    .filter((text: string) => Boolean(text));
  return (location === 'tree' && treeId) || undefined;
};

/**
 * useTreeData only works if we have a tree selected
 *
 */
export const useTreeData = (): {
  treeId: string | undefined;
  treeData: SelectedTreeType | undefined;
  error: Error | null;
  invalidate: () => void;
} => {
  const { pathname } = useLocation();
  const treeId = parseTreeIdParam(pathname);
  const queryClient = useQueryClient();
  const { getTokenSilently, isAuthenticated, user } = useAuth0();
  const treeDataParams = [`tree-${treeId}`, treeId];
  const { data: treeData, error } = useQuery<
    SelectedTreeType | undefined,
    Error
  >(treeDataParams, loadTree, {
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const isAdoptedParams = [
    `tree-${treeId}-adopted`,
    treeId,
    getTokenSilently,
    isAuthenticated,
    user?.sub,
  ];
  const { data: isAdopted, error: adoptedError } = useQuery<
    boolean | undefined,
    Error
  >(isAdoptedParams, isTreeAdopted, {
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return {
    treeId,
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
