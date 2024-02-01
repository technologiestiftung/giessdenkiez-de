import { createAPIUrl } from '../createAPIUrl';
import { requests } from '../requestUtil';

interface IsTreeAdoptedProps {
  id: string;
  uuid: string;
  token: string;
  isAuthenticated?: boolean;
  signal?: AbortSignal;
}

export async function isTreeAdopted(
  opts: IsTreeAdoptedProps
): Promise<boolean> {
  try {
    const { isAuthenticated, uuid, id, token, signal } = opts;
    if (!isAuthenticated) return false;
    const url = createAPIUrl(`/v3/get/istreeadopted?uuid=${uuid}&id=${id}`);

    const json = await requests<
      { data: IsTreeAdoptedProps },
      { signal: AbortSignal | undefined }
    >(url, {
      token,
      override: { signal },
    });
    return Boolean(json.data);
  } catch (error) {
    console.error(error);
    return error;
  }
}
