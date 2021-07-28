// src/mocks/handlers.js

import { rest } from 'msw';
interface Payload {
  data?: Record<string, any> | Record<string, any>[] | boolean | string;
  message?: string;
}

interface WateredTree {
  tree_id: string;
  time: string;
  uuid: string;
  amount: string;
  timestamp: string;
  username: string;
}
let location = '';
if (process.env.NODE_ENV === 'test') {
  location = '';
} else {
  if (process.env.NODE_ENV === 'development') {
    location = process.env.API_ENDPOINT_DEV ? process.env.API_ENDPOINT_DEV : '';
  } else if (process.env.NODE_ENV === 'production') {
    location = process.env.API_ENDPOINT_PROD
      ? process.env.API_ENDPOINT_PROD
      : '';
  } else {
    console.log('NODE_ENV is not defiend');
    location = '';
  }
}

let adoptedTreeIds: string[] = [];

const wateredAndAdopted: {
  tree_id: string;
  adopted: string;
  watered: string;
}[] = [];

const treesWatered: WateredTree[] = [];

/**
 * Extracts top level properties from an object or URLSearchParams. Only looks for strings. with a given key. All other types are ignored and returned as undefined
 *
 */
export function getProperty(
  item: Record<string, any> | URLSearchParams,
  key: string
): string {
  if (item instanceof URLSearchParams) {
    const res = item.get(key);
    return res ? res : '';
  }
  return typeof item[key] === 'string' ? item[key] : '';
}

export const handlers = [
  // Handles a POST /login request

  rest.post(`${location}/login`, async (_req, res, ctx) => {
    return res(ctx.status(201));
  }),

  rest.delete(`${location}/delete`, (req, res, ctx) => {
    // console.log('intercepting DELETE requests');
    const json: Payload = {};
    let body: Record<string, any> = {};
    if (typeof req.body === 'string') {
      body = JSON.parse(req.body);
    } else {
      body = req.body ? req.body : {};
    }
    const queryType = body ? getProperty(body, 'queryType') : '';
    // console.log(body);
    switch (queryType) {
      case 'unadopt': {
        // remove from adopted trees list
        // adoptedTreeIds[]
        // reduce adopted list by one
        //wateredAndAdopted
        // get a call to adopted
        // and is tree adopted
        break;
      }
      case undefined:
      case null: {
        console.log(' queryType is undefined or null');
        break;
      }
      default: {
        console.log('no default case for delete action defiend');
      }
    }
    return res(ctx.status(201), ctx.json(json));
  }),
  rest.post(`${location}/post`, (req, res, ctx) => {
    let json: Payload = {};
    let body: Record<string, any> = {};
    if (typeof req.body === 'string') {
      body = JSON.parse(req.body);
    } else {
      body = req.body ? req.body : {};
    }
    const queryType = body ? getProperty(body, 'queryType') : '';

    switch (queryType) {
      case 'water': {
        treesWatered.push({
          tree_id: getProperty(body, 'tree_id'),
          time: new Date().toLocaleString(),
          timestamp: new Date().toLocaleString(),
          uuid: getProperty(body, 'uuid'),
          username: getProperty(body, 'username'),
          amount: body.amount ? body.amount : 0,
        });
        let found = false;
        for (let i = 0; i < wateredAndAdopted.length; i++) {
          if (body.tree_id === wateredAndAdopted[i].tree_id) {
            wateredAndAdopted[i].watered = `${
              parseInt(wateredAndAdopted[i].watered) + 1
            }`;
            found = true;
            break;
          }
        }
        if (found === false) {
          wateredAndAdopted.push({
            tree_id: body.tree_id,
            adopted: '0',
            watered: '1',
          });
        }
        json = { data: 'watered tree', message: `${queryType}` };
        break;
      }
      case 'adopt': {
        // console.log(`calling POST ${queryType}`);
        adoptedTreeIds = [...new Set([body.tree_id, ...adoptedTreeIds])];

        let found = false;
        for (let i = 0; i < wateredAndAdopted.length; i++) {
          if (body.tree_id === wateredAndAdopted[i].tree_id) {
            wateredAndAdopted[i].adopted = `${
              parseInt(wateredAndAdopted[i].adopted) + 1
            }`;
            found = true;
            break;
          }
        }
        if (found === false) {
          wateredAndAdopted.push({
            tree_id: body.tree_id,
            adopted: '1',
            watered: '0',
          });
        }
        json = { data: 'tree was adopted', message: `${queryType}` };
        break;
      }
      case undefined:
      case null: {
        console.error('queryType is not defiend');
        break;
      }
      default: {
        json = { data: [], message: `default case for post ${body}` };
      }
    }
    return res(ctx.status(201), ctx.json(json));
  }),

  // Handles a GET /user request

  rest.get(`${location}/`, async (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ foo: 'bar' }));
  }),

  rest.get(`${location}/get`, async (req, res, ctx) => {
    let json: Payload = {};

    // const queries = getUrlQueries(req.url.href);
    // const query = req.url.searchParams;
    // const queryType = query.get('queryType');
    const queryType = getProperty(req.url.searchParams, 'queryType');

    switch (queryType) {
      case 'treesWateredByUser': {
        json = { data: treesWatered, message: `${queryType}` };

        break;
      }
      case 'treesbyids': {
        const originalResponse = await ctx.fetch(req);
        json = { ...originalResponse };
        break;
      }
      case 'byid': {
        const originalResponse = await ctx.fetch(req);
        json = { ...originalResponse };
        if (process.env.NODE_ENV === 'test') {
          json = { data: [{ id: '_abc' }] };
        }
        break;
      }
      case 'adopted': {
        json = { data: [...adoptedTreeIds], message: `${queryType}` };
        break;
      }
      case 'istreeadopted': {
        const id = getProperty(req.url.searchParams, 'id');
        json = {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          data: adoptedTreeIds.includes(id) ? true : false,
          message: `${queryType}`,
        };
        break;
      }
      case 'wateredbyuser': {
        // const uuid = queries.get('uuid'); // if we need it
        json = { data: treesWatered, message: `${queryType}` };
        break;
      }
      case 'wateredandadopted': {
        json = { data: wateredAndAdopted, message: `${queryType}` };
        break;
      }
      case 'lastwatered': {
        const id = getProperty(req.url.searchParams, 'id');

        const lastWateredByUser = treesWatered.map(tree => {
          if (tree.tree_id === id) {
            return tree;
          } else {
            return;
          }
        });
        const lastWateredByUserFiltered = lastWateredByUser.filter(Boolean); // https://stackoverflow.com/a/281335/1770432
        json = { data: lastWateredByUserFiltered, message: `${queryType}` };
        break;
      }
      case 'watered': {
        const watered = treesWatered.map(tree => tree.tree_id);
        json = { data: { watered }, message: `${queryType}` };

        break;
      }
      default: {
        // console.log('UNHANDELED request to');
        // console.log(req.url.href);
        const originalResponse = await ctx.fetch(req);
        json = {
          data: [],
          url: req.url,
          message: `case ${queryType} with url "${req.url}" in default case. Not yet defined and passed through`,
          ...originalResponse,
        };
        // console.log('response is patched and gets passed through', json);
        break;
      }
    }

    return res(ctx.status(200), ctx.json(json));
  }),

  rest.get(
    'https://tsb-trees-api-user-management.now.sh/api/user',
    (req, res, ctx) => {
      // const query = req.url.searchParams;
      // const queryType = query.get('queryType');
      // console.log('queryType', queryType);

      const userid = getProperty(req.url.searchParams, 'id');
      const json: Payload = {
        data: {
          user_id: userid,
          email: 'test@gdk.de',
          email_verified: true,
          name: 'gdkboss123',
          nickname: 'the GDK boss',
          username: 'GDK OG',
        },
      };
      return res(ctx.status(200), ctx.json(json));
    }
  ),
];
