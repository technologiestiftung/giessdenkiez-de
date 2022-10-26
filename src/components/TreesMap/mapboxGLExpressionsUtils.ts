export const getFilterMatchingIdsList = (
  idsList: string[]
): boolean | unknown[] => {
  if (idsList.length === 0) return false;

  return ['match', ['get', 'id'], idsList, true, false];
};
