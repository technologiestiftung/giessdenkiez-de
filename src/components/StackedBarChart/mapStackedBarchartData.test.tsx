import { getChartConfig } from './getChartConfig';
import { mapStackedBarchartData } from './mapStackedBarchartData';

const today = new Date('2020-06-01T00:00:00.000Z');
const thirtyDaysAgo = new Date(today.getTime() - 29 * 24 * 60 * 60 * 1000);
const arrayOf30 = [...Array(30)].map((_, idx) => idx + 1);
const waterings = arrayOf30.map((val, idx) => ({
  id: idx,
  treeId: 'abc',
  uuid: 'def',
  amount: val,
  timestamp: new Date().toISOString(),
  username: 'vogelino',
}));

const testSelectedTree = {
  // eslint-disable-next-line
  // prettier-ignore
  radolan_days: [0,0,0,0,0,0,0,0,0,0,0,0,2.8,0.1,2.2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2.4,0.1,0,0.3,0,0,0,0,0,0.6,0.3,2.4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.2,0.1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.2,0,0.6,0.5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.2,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.3,0,0.1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.4,2.6,4.7,0,0.2,0,0.5,0,0,0,0,0,0,0,0,0,0,0,0,0.3,1.4,0.4,0,0,0,0,6.6,0,0,0.1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.1,1.1,0.5,0.9,0.8,1.3,1.2,0,0,0,0,1.4,0,0,0,0,0,0,0,0.4,0,0,0,0,0.4,0,0.4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1.6,0.2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2.2,0.1,0.2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.5,0.1,0.1,0,0,3.6,3.6,0,0,0.5,0.8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.3,0.1,0.2,0,0,0,0,0],
  radolan_sum: 10,
  latitude: 10,
  longitude: 20,
  id: 'wefweqefq',
  isAdopted: true,
  waterings,
};

const config = getChartConfig();

const testArgs = {
  selectedTree: testSelectedTree,
  today,
  config,
};

describe('mapStackedBarchartData -> thirtyDaysData', () => {
  test('should combine waterings and selectedTree data', () => {
    const { thirtyDaysData } = mapStackedBarchartData(testArgs);
    expect(thirtyDaysData[0].rainingAmount).toBe(0);
    expect(thirtyDaysData[1].rainingAmount).toBe(0.6000000000000001);
  });
  test('should have length 30', () => {
    const { thirtyDaysData } = mapStackedBarchartData(testArgs);
    expect(thirtyDaysData).toHaveLength(30);
  });
  test('should have last 30 days', () => {
    const { thirtyDaysData } = mapStackedBarchartData(testArgs);
    expect(new Date(thirtyDaysData[29].id).toISOString()).toBe(
      thirtyDaysAgo.toISOString()
    );
    expect(new Date(thirtyDaysData[0].id).toISOString()).toBe(
      today.toISOString()
    );
  });
});

describe('mapStackedBarchartData -> xAxisLabels', () => {
  test('should return 3 x axis labels', () => {
    const { xAxisLabels } = mapStackedBarchartData(testArgs);
    expect(xAxisLabels).toMatchInlineSnapshot(`
      Array [
        Object {
          "id": "2020-05-27",
          "label": "27. May.",
          "x": 249,
        },
        Object {
          "id": "2020-05-17",
          "label": "17. May.",
          "x": 155,
        },
        Object {
          "id": "2020-05-07",
          "label": "07. May.",
          "x": 62,
        },
      ]
    `);
  });
});

describe('mapStackedBarchartData -> yAxisLabels', () => {
  test('should return 3 x axis labels', () => {
    const { yAxisLabels } = mapStackedBarchartData(testArgs);
    expect(yAxisLabels).toMatchInlineSnapshot(`
      Array [
        Object {
          "id": "60",
          "label": "60",
          "y": 25,
        },
        Object {
          "id": "50",
          "label": "50",
          "y": 41,
        },
        Object {
          "id": "40",
          "label": "40",
          "y": 57,
        },
        Object {
          "id": "30",
          "label": "30",
          "y": 73,
        },
        Object {
          "id": "20",
          "label": "20",
          "y": 88,
        },
        Object {
          "id": "10",
          "label": "10",
          "y": 104,
        },
        Object {
          "id": "0",
          "label": "0",
          "y": 120,
        },
      ]
    `);
  });
});
