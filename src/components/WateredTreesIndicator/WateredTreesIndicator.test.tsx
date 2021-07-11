import React from 'react';
import { render, screen } from '@testing-library/react';
import WateredTreesIndicator from '.';
import { WateringType } from '../../common/interfaces';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../assets/theme';

const createTestWaterings = (amount = 1): WateringType[] =>
  [...new Array(amount)].map(
    (_, idx: number): WateringType => ({
      amount: idx * 10,
      id: `wgqwegqwg-${idx}`,
      username: `Bob-${idx}`,
      timestamp: new Date().toISOString(),
      treeId: `dqfjqwfw-${idx}`,
    })
  );

describe('component WateredTreesIndicator', () => {
  test('should render the times and liters labels', () => {
    render(
      <ThemeProvider theme={theme}>
        <WateredTreesIndicator waterings={createTestWaterings(5)} />
      </ThemeProvider>
    );
    const timesLabel = screen.getByText(/mal gegossen/i);
    const litersLabel = screen.getByText(/Liter gegossen/i);
    expect(timesLabel).toBeInTheDocument();
    expect(litersLabel).toBeInTheDocument();
  });
  test('should render the times and amount numbers', () => {
    const waterings = createTestWaterings(5);
    render(
      <ThemeProvider theme={theme}>
        <WateredTreesIndicator waterings={waterings} />
      </ThemeProvider>
    );
    const timesAmount = screen.getByText(/5/i);
    const literAmount = screen.getByText(/100/i);
    expect(timesAmount).toBeInTheDocument();
    expect(literAmount).toBeInTheDocument();
  });
});
