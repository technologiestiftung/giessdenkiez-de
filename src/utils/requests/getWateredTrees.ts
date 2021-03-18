import { createAPIUrl, requests } from '..';

export const getWateredTrees = async (): Promise<string[]> => {
  const url = createAPIUrl('/get?queryType=watered');
  const result = await requests<{ data?: { watered: string[] } }>(url);

  if (result.data === undefined) {
    throw new Error('data is not defined on getWateredTrees');
  }
  return result.data.watered;
};
