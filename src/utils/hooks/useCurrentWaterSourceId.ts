import { useLocation } from 'react-router';

const parseWaterSourceIdParam = (path: string): string | null => {
  const [location, waterSourceId] = path
    .replace(/\?.*$/g, '')
    .split('/')
    .filter((text: string) => Boolean(text));
  return (location === 'watersource' && waterSourceId) || null;
};

export const useCurrentWaterSourceId = (): string | null => {
  const { pathname } = useLocation();
  return parseWaterSourceIdParam(pathname);
};
