import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import UsersWateringsList from '.';
import { WateringType } from '../../common/interfaces';
import { QueryClient, QueryClientProvider } from 'react-query';
import { formatUnixTimestamp } from '../../utils/formatUnixTimestamp';

const queryClient = new QueryClient();

const Component = ({ waterings }) => (
  <QueryClientProvider client={queryClient}>
    <UsersWateringsList treeId='_abc' waterings={waterings} />
  </QueryClientProvider>
);

jest.mock('../../utils/hooks/useUserData', () => {
  return {
    useUserData: () => ({
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
    }),
  };
});

const waterTreeMock = jest.fn();
const unwaterTreeMock = jest.fn();

jest.mock('../../utils/hooks/useWateringActions', () => {
  return {
    useWateringActions: () => ({
      waterTree: waterTreeMock,
      unwaterTree: unwaterTreeMock,
      isBeingWatered: true,
      isBeingUnwatered: true,
    }),
  };
});

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
  test('should show the most recent watering at the top and the oldest at the bottom', () => {
    const EARLIEST_TIMESTAMP = '2023-06-03T09:45:12+00:00';
    const MIDDLE_TIMESTAMP = '2023-06-09T18:05:44+00:00';
    const LATEST_TIMESTAMP = '2023-06-12T12:21:34+00:00';
    const waterings: WateringType[] = [
      {
        username: 'x',
        treeId: 'x',
        id: 2,
        amount: 10,
        timestamp: MIDDLE_TIMESTAMP,
      },
      {
        username: 'x',
        treeId: 'x',
        id: 1,
        amount: 10,
        timestamp: EARLIEST_TIMESTAMP,
      },
      {
        username: 'x',
        treeId: 'x',
        id: 3,
        amount: 10,
        timestamp: LATEST_TIMESTAMP,
      },
    ];
    render(<Component waterings={waterings} />);

    const wateringsList = screen.getByRole('list', {
      name: 'Letzte Bewässerungen (neueste zuerst)',
    });
    expect(wateringsList).toBeInTheDocument();

    const wateringListItems = within(wateringsList).getAllByRole('listitem');

    expect(wateringListItems[0]).toContainHTML(
      formatUnixTimestamp(LATEST_TIMESTAMP)
    );
    expect(wateringListItems[wateringListItems.length - 1]).toContainHTML(
      formatUnixTimestamp(EARLIEST_TIMESTAMP)
    );
  });
  test('should expand on click and render all the waterings', () => {
    const waterings = createTestWaterings(50);
    render(<Component waterings={waterings} />);

    const showMoreButton = screen.getByText(/weitere Bewässerungen anzeigen/i);

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
