// in src/pages/api/admin/[[...slug]].ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // get the incoming request URL, e.g. 'posts?limit=10&offset=0&order=id.asc'
  const requestUrl = req.url?.substring('/api/admin/'.length);
  // build the CRUD request based on the incoming request
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/${requestUrl}`;
  const options: RequestInit = {
    method: req.method,
    headers: {
      prefer: (req.headers['prefer'] as string) ?? '',
      accept: req.headers['accept'] ?? 'application/json',
      ['content-type']: req.headers['content-type'] ?? 'application/json',
      // supabase authentication
      // FIXME: This should not be used in production
      apiKey: process.env.SUPABASE_SERVICE_ROLE ?? '',
    },
  };
  if (req.body) {
    options.body = JSON.stringify(req.body);
  }
  // call the CRUD API
  const response = await fetch(url, options);
  // send the response back to the client
  const contentRange = response.headers.get('content-range');
  if (contentRange) {
    res.setHeader('Content-Range', contentRange);
  }
  res.end(await response.text());
}
