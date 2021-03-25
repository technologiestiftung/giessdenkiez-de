import { getLayers, getPumpLayer, getRainLayer } from '.';

import { FeatureCollection } from 'src/types';

const test_trees: FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [13.50213, 52.645680000000006] },
      properties: { id: 'nt240620302094', radolan_sum: 43.9, age: 2 },
    },
  ],
};

const test_pumps: FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      id: '0',
      type: 'Feature',
      properties: {
        'addr:full': 'Schragenfeldstraße 25',
        check_date: 'unbekannt',
        id: 352734260,
        image: 'File:Plumpe 11 Marzahn Schragenfeldstraße-Bäckerpfuhl (8).jpg',
        'pump:status': 'unbekannt',
        'pump:style': 'Borsig',
      },
      geometry: {
        type: 'Point',
        coordinates: [13.564219, 52.5398067],
      },
    },
  ],
};

const test_rain: FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [13.4971096103036, 52.6543762343589],
            [13.5042366641048, 52.6541120206218],
            [13.5033652084477, 52.64547732806],
            [13.4891325166817, 52.6460049371748],
            [13.4900002353473, 52.654638719058],
            [13.4971096103036, 52.6543762343589],
          ],
        ],
      },
      properties: {
        id: 1,
        data: [571],
      },
    },
  ],
};

const test_communityData = {
  _00l734zv4: {
    watered: true,
    adopted: false,
  },
};

const emptyFunction = function () {
  return 0;
};

describe('DeckGL Layer Generation Functions', () => {
  // test('getTreeLayer(showPumps=true, pumps=test_pumps, setHoveredPump=emptyFunction)', () => {
  //   expect(getTreeLayer(true, test_pumps, emptyFunction)).toMatchSnapshot();
  // });
  test('getPumpLayer(showPumps=true, pumps=test_pumps, setHoveredPump=emptyFunction)', () => {
    expect(getPumpLayer(true, test_pumps, emptyFunction)).toMatchSnapshot();
  });
  test('getPumpLayer(showPumps=false, pumps=test_pumps, setHoveredPump=emptyFunction)', () => {
    expect(getPumpLayer(false, test_pumps, emptyFunction)).toMatchSnapshot();
  });
  test('getRainLayer(showRain=true, rain=test_rain)', () => {
    expect(getRainLayer(true, test_rain)).toMatchSnapshot();
  });
  test('getRainLayer(showRain=false, rain=test_rain)', () => {
    expect(getRainLayer(false, test_rain)).toMatchSnapshot();
  });
});
