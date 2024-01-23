export async function requests<
  ReturnType = Record<string, unknown>,
  OptionOverrides = Record<string, unknown>
>(
  url: string,
  opts?: { token?: string; override?: OptionOverrides }
): Promise<ReturnType> {
  const headers = new Headers({ 'content-type': 'application/json' });

  if (opts?.token) {
    headers.set('authorization', `Bearer ${opts.token}`);
  }

  try {
    const response = await fetch(url, {
      headers,
      ...opts?.override,
    });

    if (!response.ok) {
      const msg = await response.text();
      throw new Error(msg);
    }

    if (response.status === 204) return {} as ReturnType;

    const json = await response.json();
    return (json as unknown) as ReturnType;
  } catch (err) {
    throw new Error(err as string);
  }
}
