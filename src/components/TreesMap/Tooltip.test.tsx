import React from 'react';
import { render, screen } from '@testing-library/react';
import { Tooltip } from './Tooltip';

const testInfos = {
  'key-abc': 'value-abc',
  'key-def': 'value-def',
};

describe('component Tooltip', () => {
  test('renders all information provided to it', () => {
    render(
      <Tooltip
        title='A title'
        subtitle='A subtitle'
        infos={testInfos}
        x={200}
        y={300}
      />
    );
    const tooltipTitle = screen.getByText('A title');
    expect(tooltipTitle).toBeInTheDocument();

    const tooltipSubtitle = screen.getByText('A subtitle');
    expect(tooltipSubtitle).toBeInTheDocument();

    const firstInfoPair = screen.getAllByText(/abc/i);
    expect(firstInfoPair).toHaveLength(2);

    const secondInfoPair = screen.getAllByText(/def/i);
    expect(secondInfoPair).toHaveLength(2);
  });
  test('renders at the provided location on the screen', () => {
    render(
      <Tooltip
        title='A title'
        subtitle='A subtitle'
        infos={testInfos}
        x={200}
        y={300}
      />
    );
    const tooltip = document.querySelector('.tooltip');
    if (!tooltip) throw new Error('Could not find tooltip');
    const computedStyle = getComputedStyle(tooltip);
    expect(computedStyle.left).toBe('200px');
    expect(computedStyle.top).toBe('300px');
  });
});
