import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import TreesList from '.';
import { treeData } from '../../assets/stories-data';
import mockRouter from 'next-router-mock';
// vi.mock('next/router', () => vi.requireActual('next-router-mock'));

// const useRouter = vi.spyOn(require('next/router'), 'useRouter');

describe('component TreesList', () => {
  test('should render all trees passed as props', () => {
    render(<TreesList trees={[treeData]} />);
    const treeTitle = screen.getByText(treeData.artdtsch || '');
    expect(treeTitle).toBeInTheDocument();
  });
  test('should skil trees without ids', () => {
    const { id, ...treeA } = treeData;
    // @ts-ignore
    render(<TreesList trees={[treeA]} />);
    const treeTitle = screen.queryByText(treeData.artdtsch || '');
    expect(treeTitle).not.toBeInTheDocument();
  });
  test.skip('should go to the tree urls when clicked', async () => {
    // const mockPush = vi.fn();
    // useRouter.mockImplementationOnce(() => ({
    //   push: mockPush,
    // }));
    mockRouter.push('/');
    render(<TreesList trees={[treeData]} />);
    const treeTitle = screen.getByRole('button', { name: treeData.artdtsch });
    fireEvent.click(treeTitle);
    expect(treeTitle).toBeInTheDocument();
    expect(mockRouter).toMatchObject({
      asPath: '`/tree/${treeData.id}`',
      pathname: `/tree/${treeData.id}`,
    });

    // await waitFor(
    //   () => {
    //     expect(mockPush).toHaveBeenCalledWith(`/tree/${treeData.id}`);
    //   },
    //   { timeout: 500 }
    // );
  });
});
