import React from 'react';
import { screen, render } from '@testing-library/react';
import StackedBarChart from '.';

const today = new Date('2020-06-01T00:00:00.000Z');
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

describe('stackedBarChart', () => {
  test('should render without crashing', async () => {
    render(
      <StackedBarChart selectedTreeData={testSelectedTree} date={today} />
    );

    const svg = document.querySelector('svg');

    if (!svg) throw new Error('No svg found');

    expect(svg).toBeInTheDocument();

    const barGroups = await screen.findAllByTestId('bar-group');
    expect(barGroups).toHaveLength(30);

    const yAxisGroups = await screen.findAllByTestId('y-axis-group');
    expect(yAxisGroups).toHaveLength(7);

    const xAxisGroups = await screen.findAllByTestId('x-axis-group');
    expect(xAxisGroups).toHaveLength(3);
  });
});
