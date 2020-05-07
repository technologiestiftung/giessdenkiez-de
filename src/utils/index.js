import { interpolateViridis, scaleLinear } from "d3";
import axios from 'axios';

export function createGeojson(data) {
  const geojson = {
      "type": "FeatureCollection",
      "features": []
  }

  data.forEach((tree) => {
      const feature = {
          "type": "Feature",
          "geometry": {
              "type": "Point",
              "coordinates": [+tree.lat, +tree.lng]
          },
          "properties": {
              "id": tree.id,
              "radolan_sum": +tree.radolan_sum,
              "age": +tree.age,
          }
      }
      geojson.features.push(feature);
  })

  return geojson;
};

export function createCSVJson(data) {
  let csvArr = [];
  data.map(item => {
    csvArr.push([+item[1], +item[2],item[0],+item[3]])
  })
  return csvArr;
}


export function flatten(ary) {
    var ret = [];
    for(var i = 0; i < ary.length; i++) {
        if(Array.isArray(ary[i])) {
            ret = ret.concat(flatten(ary[i]));
        } else {
            ret.push(ary[i]);
        }
    }
    return ret;
}


export function createAPIUrl(state, entrypoint) {
    return state.local ? `${state.endpoints.local}${entrypoint}` : `${state.endpoints.prod}${entrypoint}`;
}

export async function fetchAPI(url, config = {}) {

    return axios.get(url, config)
        .then((r) => {
            return r
        }).catch(function (error) {
             console.log(error);
        });
}

export const STATI = {
  STATUS_IDLE: "IDLE",
  STATUS_LOADING: "LOADING",
  STATUS_SUCCESS: "SUCCESS",
  STATUS_ERROR: "ERROR",
};

export const createIncludedTrees = (data) => {
  let obj = {};
  data.forEach((id) => {
    obj[id] = { included: true };
  });
  return obj;
};

export const waterNeed = (age) => {
  if (!age) return null;
  if (age < 15) return [1, 1, 1];
  if (age >= 15 && age < 40) return [1, 1];
  if (age >= 40) return [1];
};

export const getCookieValue = (a) => {
  const b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
  return b ? b.pop() : '';
}

export const convertTime = (unix_timestamp) => {
  var date = new Date(unix_timestamp);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var year = date.getFullYear();
  var month = months[date.getMonth()];
  var day = date.getDate();

  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = date.getMinutes();
  // Seconds part from the timestamp
  var seconds = "0" + date.getSeconds();

  var min = String(minutes).length == 2 ? minutes : `0${minutes}`;

  // Will display time in 10:30:23 format
  return `${day}. ${month}. ${year}, ${hours}:${min}`;
  // return day month + '.' + year + '. //' + hours + ':' + minutes.substr(-2);
};

export const timeDifference = (date1, date2) => {
  let difference = date1 - date2;
  let daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);

  let label = "";

  if (date2 == "Keine Info") {
    label = "Keine Info";
  }

  if (daysDifference == 0) {
    label = "Heute";
  }

  if (daysDifference == 1) {
    label = "Vor 1 Tag";
  }

  if (daysDifference > 1) {
    label = `Vor ${daysDifference} Tagen`;
  }

  return [daysDifference, label];
};

export const interpolateColor = (val) => {
	const scale = scaleLinear()
		.domain([0,300])
		.range([1,0])
  const interpolatedValue = scale(val);
  return interpolateViridis(scale(val));
};

export const hexToRgb = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
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
  timeDifference,
  waterNeed,
	interpolateColor,
  hexToRgb,
  createGeojson,
  createCSVJson,
  createAPIUrl,
  getCookieValue,
  fetchAPI,
  flatten
};
