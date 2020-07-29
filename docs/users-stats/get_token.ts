async function getToken(options: {
  url: string;
  client_id: string;
  client_secret: string;
  audience: string;
}): Promise<string> {
  const { client_id, client_secret, audience, url } = options;
  const body = {
    client_id,
    client_secret,
    audience,
    grant_type: 'client_credentials',
  };
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      const json = await res.json();
      const { access_token } = json;
      return access_token;
    } else {
      throw new Error('could not get toke from auth0');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

if (import.meta.main) {
  console.log('running standalone');
  import('./mod.ts')
    .then(async module => {
      await module.load();
      const { url, audience, client_id, client_secret } = Deno.env.toObject();
      const token = await getToken({ url, audience, client_id, client_secret });
      module.writeFileStrSync('./token', token);
      return;
    })
    .catch(console.error);
}
