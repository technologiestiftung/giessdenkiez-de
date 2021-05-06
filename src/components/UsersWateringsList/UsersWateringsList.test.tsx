import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import UsersWateringsList from '.';
import { WateringType } from '../../common/interfaces';

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

describe('component UsersWateringsList', () => {
  test('should render each user of each watering', () => {
    const waterings = createTestWaterings(3);
    render(<UsersWateringsList waterings={waterings} />);

    waterings.forEach(watering => {
      expect(screen.getByText(watering.username)).toBeInTheDocument();
      expect(screen.getByText(`${watering.amount}l`)).toBeInTheDocument();
    });
  });
  test('should render the exact amount of waterings below the max', () => {
    const waterings = createTestWaterings(3);
    render(<UsersWateringsList waterings={waterings} />);

    const titles = document.getElementsByTagName('h3');
    expect(titles).toHaveLength(3);
  });
  test('should render the the max amount of waterings over the max', () => {
    const waterings = createTestWaterings(50);
    render(<UsersWateringsList waterings={waterings} />);

    const titles = document.getElementsByTagName('h3');
    expect(titles).toHaveLength(8);
  });
  test('should expand on click and render all the waterings', () => {
    const waterings = createTestWaterings(50);
    render(<UsersWateringsList waterings={waterings} />);

    const showMoreButton = screen.getByText(
      /zusätzliche Bewässerungen anzeigen/i
    );

    fireEvent.click(showMoreButton);

    const titles = document.getElementsByTagName('h3');
    expect(titles).toHaveLength(50);
  });
});
