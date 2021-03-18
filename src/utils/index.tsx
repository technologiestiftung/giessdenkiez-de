import { scaleLinear, interpolateViridis } from 'd3';
import { Generic } from '../common/interfaces';

export function createAPIUrl(entrypoint: string): string {
  return process.env.NODE_ENV === 'production'
    ? `${process.env.API_ENDPOINT_PROD}${entrypoint}`
    : `${process.env.API_ENDPOINT_DEV}${entrypoint}`;
}

export async function requests<
  ReturnType = Generic,
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
    const json = await response.json();
    return json;
  } catch (err) {
    throw new Error(err);
  }
}

// TODO: review array callback return
// Expected to return a value in arrow function.eslintarray-callback-return
//
export function createCSVJson(data): [number, number, number, number][] {
  const csvArr: Array<[number, number, number, number]> = [];
  data.map(item => {
    csvArr.push([+item[1], +item[2], item[0], +item[3]]);
  });
  return csvArr;
}

export function flatten(ary): any[] {
  let ret: any[] = [];
  for (let i = 0; i < ary.length; i++) {
    if (Array.isArray(ary[i])) {
      ret = ret.concat(flatten(ary[i]));
    } else {
      ret.push(ary[i]);
    }
  }
  return ret;
}

export async function waitFor(
  millisenconds: number,
  callback: () => void
): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => {
      callback();
      resolve();
    }, millisenconds);
  });
}

/**
 * Shoulf not be used anymoe
 * @deprecated
 *
 */

export const STATI = {
  STATUS_IDLE: 'IDLE',
  STATUS_LOADING: 'LOADING',
  STATUS_SUCCESS: 'SUCCESS',
  STATUS_ERROR: 'ERROR',
};

export const createIncludedTrees = data => {
  const obj = {};
  data.forEach(id => {
    obj[id] = { included: true };
  });
  return obj;
};

export const waterNeed = (age?: number): null | number[] => {
  if (!age) {
    return null;
  }
  if (age < 15) {
    return [1, 1, 1];
  }
  if (age >= 15 && age < 40) {
    return [1, 1];
  }
  if (age >= 40) {
    return [1];
  }
  return null;
};

export const getCookieValue = (a: string | number) => {
  const b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
  return b ? b.pop() : '';
};

export const convertTime = (unix_timestamp: string): string => {
  const sliced = unix_timestamp.slice(0, 16);
  const date = new Date(sliced);
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();

  // Will display time in 10:30:23 format
  return `${day}. ${month}. ${year}`;
};

const colorScale = scaleLinear().domain([0, 300]).range([1, 0.6]);
export const interpolateColor = (val: number): string => {
  return interpolateViridis(colorScale(val));
};

export const hexToRgb = (
  hex: string
): [number, number, number, number] | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
        200,
      ]
    : null;
};

export default {
  convertTime,
  interpolateColor,
  waterNeed,
  hexToRgb,
  createCSVJson,
  createAPIUrl,
  getCookieValue,
  flatten,
};
