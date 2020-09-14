import { scaleLinear, interpolateViridis } from 'd3';
import axios from 'axios';
import { IsTreeAdoptedProps, Generic } from '../common/interfaces';

export function createAPIUrl(state: any, entrypoint: string): string {
  return state.local
    ? `${state.endpoints.local}${entrypoint}`
    : `${state.endpoints.prod}${entrypoint}`;
}

/**
 * Deliberately does not hande errors. You will have to handle them in the calling function
 */
export async function requests<T>(
  url: string,
  opts?: { token?: string; override?: T }
): Promise<Generic> {
  // try {
  const headers = new Headers({ 'content-type': 'application/json' });
  if (opts?.token) {
    headers.set('authorization', `Bearer ${opts.token}`);
  }
  const response = await fetch(url, {
    headers,
    ...opts?.override,
  });
  if (!response.ok) {
    const msg = await response.text();
    console.error(msg);
    return new Error(msg);
  }
  const json = await response.json();
  return json;
}

export async function isTreeAdopted(opts: IsTreeAdoptedProps): Promise<void> {
  const { isAuthenticated, uuid, id, token, store, signal } = opts;
  try {
    if (isAuthenticated) {
      const url = createAPIUrl(
        store.getState(),
        `/get?queryType=istreeadopted&uuid=${uuid}&id=${id}`
      );

      const json = await requests(url, { token, override: { signal } });
      store.setState({ treeAdopted: json.data });
    }
  } catch (error) {
    console.log(error);
  }
}

export function createGeojson(data) {
  const geojson: { type: 'FeatureCollection'; features: any[] } = {
    type: 'FeatureCollection',
    features: [],
  };

  data.forEach(tree => {
    const feature = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [+tree.lng, +tree.lat],
      },
      /**
       * Apparently DWD 1 is not 1ml but 0.1ml
       * We could change this in the database, but this would mean,
       * transferring 625.000 "," characters, therefore,
       * changing it client-side makes more sense.
       */
      properties: {
        id: tree.id,
        radolan_sum: +tree.radolan_sum / 10,
        age: +tree.age,
      },
    };
    geojson.features.push(feature);
  });

  return geojson;
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
// export const waitFor = (millisenconds: number, callback: () => void) =>
//   new Promise(resolve => {
//     setTimeout(() => {
//       callback();
//       resolve();
//     }, millisenconds);
//   });

/**
 * Shoulf not be used anymoe
 * @deprecated
 *
 */
export async function fetchAPI(url: string, config = {}) {
  const res = axios
    .get(url, config)
    .then(r => {
      return r;
    })
    .catch(function (error) {
      console.log(error);
    });
  const result = await res;
  if (result === undefined) {
    throw new Error('result of fetch request is undefined');
  }

  return result;
}

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

  // let hours = date.getHours();
  // Minutes part from the timestamp
  // let minutes = date.getMinutes();
  // Seconds part from the timestamp
  // var seconds = '0' + date.getSeconds();

  // let min = String(minutes).length === 2 ? minutes : `0${minutes}`;

  // Will display time in 10:30:23 format
  return `${day}. ${month}. ${year}`;
  // return day month + '.' + year + '. //' + hours + ':' + minutes.substr(-2);
};

export const removeOverlay = () => {
  const elem: HTMLElement | null = document.querySelector('#tempOverlay');
  if (elem) {
    elem.style.display = 'none';
  }
};

export const timeDifference = (date1, date2) => {
  const difference = date1 - date2;
  const daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);

  let label = '';

  if (date2 === 'Keine Info') {
    label = 'Keine Info';
  }

  if (daysDifference === 0) {
    label = 'Heute';
  }

  if (daysDifference === 1) {
    label = 'Vor 1 Tag';
  }

  if (daysDifference > 1) {
    label = `Vor ${daysDifference} Tagen`;
  }

  return [daysDifference, label];
};

export const interpolateColor = val => {
  const scale = scaleLinear().domain([0, 300]).range([1, 0.6]);
  const hexColor = interpolateViridis(scale(val));
  // const rgbString = interpolateRdYlGn(scale(val));
  // const col = color(rgbString);
  // debugger;
  // const hex = col?.hex();
  // if (hex) {
  return hexColor;
  // } else {
  // return '#868686'; // fallback grey https://www.color-hex.com/color/868686
  // }
};

export const hexToRgb = hex => {
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

/**
 * Test uf the user has geolocation activeted or not
 * @param geoLocationErrorHandler Function
 * @param geoLocationSuccessHandler Function
 * @returns void
 */
export function checkGeolocationFeature(
  geoLocationErrorHandler,
  geoLocationSuccessHandler
) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      geoLocationSuccessHandler,
      geoLocationErrorHandler
    );
  } else {
    throw new Error('Could not find feature navigator.geolocation');
  }
}

export default {
  convertTime,
  timeDifference,
  waterNeed,
  interpolateColor,
  removeOverlay,
  hexToRgb,
  createGeojson,
  createCSVJson,
  createAPIUrl,
  getCookieValue,
  fetchAPI,
  flatten,
};
