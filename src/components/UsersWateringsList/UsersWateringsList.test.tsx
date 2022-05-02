import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import UsersWateringsList from '.';
import { WateringType } from '../../common/interfaces';
import { QueryClient, QueryClientProvider } from 'react-query';
import * as useUserDataHook from '../../utils/hooks/useUserData';
import * as useWateringActionsHook from '../../utils/hooks/useWateringActions';

const queryClient = new QueryClient();

const Component = ({ waterings }) => (
  <QueryClientProvider client={queryClient}>
    <UsersWateringsList treeId='_abc' waterings={waterings} />
  </QueryClientProvider>
);

jest.spyOn(useUserDataHook, 'useUserData').mockImplementation(
  jest.fn().mockReturnValue({
    userData: {
      id: 'auth|123',
      email: 'test@example.com',
      username: 'Bob-0',
      isVerified: true,
      waterings: [
        { amount: 10, id: 123, timestamp: '2020-01-01T00:00:00.000Z' },
      ],
      adoptedTrees: ['_abc'],
    },
    error: null,
    invalidate: () => undefined,
  })
);

const waterTreeMock = jest.fn();
const unwaterTreeMock = jest.fn();

jest.spyOn(useWateringActionsHook, 'useWateringActions').mockImplementation(
  jest.fn().mockReturnValue({
    waterTree: waterTreeMock,
    unwaterTree: unwaterTreeMock,
    isBeingWatered: true,
    isBeingUnwatered: true,
  })
);

const createTestWaterings = (amount = 1): WateringType[] =>
  [...new Array(amount)].map(
    (_, idx: number): WateringType => ({
      amount: idx * 10,
      id: idx,
      username: `Bob-${idx}`,
      timestamp: new Date().toISOString(),
      treeId: `dqfjqwfw-${idx}`,
    })
  );

describe('component UsersWateringsList', () => {
  test('should render each user of each watering', () => {
    const waterings = createTestWaterings(3);
    render(<Component waterings={waterings} />);

    waterings.forEach(watering => {
      expect(screen.getByText(watering.username)).toBeInTheDocument();
      expect(screen.getByText(`${watering.amount}l`)).toBeInTheDocument();
    });
  });
  test('should render the exact amount of waterings below the max', () => {
    const waterings = createTestWaterings(3);
    render(<Component waterings={waterings} />);

    const titles = document.getElementsByTagName('h3');
    expect(titles).toHaveLength(3);
  });
  test('should render the the max amount of waterings over the max', () => {
    const waterings = createTestWaterings(50);
    render(<Component waterings={waterings} />);

    const titles = document.getElementsByTagName('h3');
    expect(titles).toHaveLength(8);
  });
  test('should expand on click and render all the waterings', () => {
    const waterings = createTestWaterings(50);
    render(<Component waterings={waterings} />);

    const showMoreButton = screen.getByText(
      /zusätzliche Bewässerungen anzeigen/i
    );

    fireEvent.click(showMoreButton);

    const titles = document.getElementsByTagName('h3');
    expect(titles).toHaveLength(50);
  });
  test('should expand the confirmation when on delete', () => {
    const waterings = createTestWaterings(1);
    render(<Component waterings={waterings} />);

    const deleteButton = screen.getByRole('button', {
      name: /Gießung rückgängig machen/i,
    });

    fireEvent.click(deleteButton);

    const deleteConfirmationButton = screen.getByRole('button', {
      name: /Gießung unwiderruflich löschen/i,
    });

    expect(deleteConfirmationButton).toBeInTheDocument();

    fireEvent.click(deleteConfirmationButton);

    expect(unwaterTreeMock).toHaveBeenCalledWith(waterings[0].id);
  });
});
