import { useRouter } from 'next/router';

export const useCurrentTreeId = (): string | null => {
  const { query } = useRouter();
  return typeof query.id !== "string" ? null : `${query.id}`;
};
