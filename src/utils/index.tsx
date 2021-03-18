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

export const areCookiesAccepted = (a: string | number): boolean => {
  const b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
  return b ? b.pop() === 'true' : false;
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
  createAPIUrl,
  areCookiesAccepted,
};
