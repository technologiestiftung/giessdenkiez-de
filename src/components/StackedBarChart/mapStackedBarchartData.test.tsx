import { mapStackedBarchartData } from './mapStackedBarchartData';

const arrayOf30 = [...Array(30)].map((_, idx) => idx + 1);
const waterings = arrayOf30.map(val => ({
  id: 'abc',
  treeId: 'abc',
  uuid: 'def',
  amount: val,
  timestamp: new Date().toISOString(),
  username: 'vogelino',
}));

const testSelectedTree = {
  // eslint-disable-next-line
  radolan_days: [0,0,0,0,0,0,0,0,0,0,0,0,2.8,0.1,2.2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2.4,0.1,0,0.3,0,0,0,0,0,0.6,0.3,2.4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.2,0.1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.2,0,0.6,0.5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.2,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.3,0,0.1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.4,2.6,4.7,0,0.2,0,0.5,0,0,0,0,0,0,0,0,0,0,0,0,0.3,1.4,0.4,0,0,0,0,6.6,0,0,0.1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.1,1.1,0.5,0.9,0.8,1.3,1.2,0,0,0,0,1.4,0,0,0,0,0,0,0,0.4,0,0,0,0,0.4,0,0.4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1.6,0.2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2.2,0.1,0.2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.5,0.1,0.1,0,0,3.6,3.6,0,0,0.5,0.8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.3,0.1,0.2,0,0,0,0,0],
  radolan_sum: 10,
  latitude: 10,
  longitude: 20,
  id: 'wefweqefq',
  isAdopted: true,
  waterings,
};

describe('mapStackedBarchartData', () => {
  test('should combine waterings and selectedTree data', () => {
    const mappedStackedBarchartData = mapStackedBarchartData(testSelectedTree);
    expect(mappedStackedBarchartData[0].rainValue).toBe(0);
    expect(mappedStackedBarchartData[1].rainValue).toBe(0.6000000000000001);
  });
  test('should have length 30', () => {
    const mappedStackedBarchartData = mapStackedBarchartData(testSelectedTree);
    expect(mappedStackedBarchartData).toHaveLength(30);
  });
  test('should have last 30 days', () => {
    const mappedStackedBarchartData = mapStackedBarchartData(testSelectedTree);
    const date = new Date(new Date().toISOString().split('T')[0]);
    expect(mappedStackedBarchartData[0].id).toBe(+date);
    date.setDate(date.getDate() - 29);
    expect(mappedStackedBarchartData[29].id).toBe(+date);
  });
});
