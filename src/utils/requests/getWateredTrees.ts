import { createAPIUrl } from '../createAPIUrl';
import { requests } from '../requestUtil';

export const getWateredTrees = async (): Promise<string[]> => {
  const url = createAPIUrl('/v3/get/watered');
  const result = await requests<{ data?: { watered: string[] } }>(url);

  if (result.data === undefined) {
    throw new Error('data is not defined on getWateredTrees');
  }
  return result.data.watered;
};