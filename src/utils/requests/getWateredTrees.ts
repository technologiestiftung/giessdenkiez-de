import { createAPIUrl } from '../createAPIUrl';
import { requests } from '../requestUtil';

/**
 * @deprecated Is this used anywhere?
 *
 */
export const getWateredTrees = async (): Promise<string[]> => {
  const url = createAPIUrl('/get/watered');
  const result = await requests<{ data?: { watered: string[] } }>(url);
  if (result.data === undefined) {
    throw new Error('data is not defined on getWateredTrees');
  }
  return result.data.watered;
};
