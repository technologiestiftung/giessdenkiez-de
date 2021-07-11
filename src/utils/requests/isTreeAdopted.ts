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
  const { isAuthenticated, uuid, id, token, signal } = opts;
  if (!isAuthenticated) return false;
  const url = createAPIUrl(
    `/get?queryType=istreeadopted&uuid=${uuid}&id=${id}`
  );

  const json = await requests<
    { data: IsTreeAdoptedProps },
    { signal: AbortSignal | undefined }
  >(url, {
    token,
    override: { signal },
  });
  return Boolean(json.data);
}
