//explorer.ts
import { readFileStr, load } from './mod.ts';

async function main(): Promise<void> {
  await load();
  const { apiurl } = Deno.env.toObject();
  const perpage = 50;
  let page = 0;

  const token = await readFileStr('./token', { encoding: 'utf8' });
  let next = true;

  const users = [];

  const headers = new Headers({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  });
  while (next) {
    const url = `${apiurl}/users?page=${page}&per_page=${perpage}`;
    const res = await fetch(url, {
      method: 'GET',
      headers,
    });
    if (!res.ok) {
      next = false;
      break;
    } else {
      const json = (await res.json()) as any[];
      // console.log(json);
      users.push(...json);
      page++;
    }
  }

  const domains: string[] = [];
  const notVerified = [];
  users.forEach(user => {
    if (user.email_verified === false) {
      // console.log(user.email);
      const domain = user.email.split('@')[1];

      domains.push(domain);
      notVerified.push(user);
    }
  });
  const mails = users.map(user => user.email);
  const uniqueDomains = [...new Set(domains)];

  console.log('-----------users-----------');
  console.log('users tried to signed up          ', users.length);
  console.log('----- email verification -------');
  console.log('number not verfied user mails     ', notVerified.length);
  console.log('unique not verified domains       ', uniqueDomains.join(', '));

  // const diskjson = (await readJson("./giessdenkiez-users.json")) as any[];

  // console.log(diskjson.length);
}

main().catch(console.error);
