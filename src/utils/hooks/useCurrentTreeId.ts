import { useLocation } from 'react-router';

const parseTreeIdParam = (path: string): string | null => {
  const [location, treeId] = path
    .replace(/\?.*$/g, '')
    .split('/')
    .filter((text: string) => Boolean(text));
  return (location === 'tree' && treeId) || null;
};

export const useCurrentTreeId = (): string | null => {
  const { pathname } = useLocation();
  return parseTreeIdParam(pathname);
};
