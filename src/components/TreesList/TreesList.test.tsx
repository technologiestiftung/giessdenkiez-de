import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import TreesList from '.';
import { treeData } from '../../assets/stories-data';
import history from '../../history';
import { TestProviders } from '../../Providers/TestProviders';

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
  test('should go to the tree urls when clicked', async () => {
    const stubbedPushCall = jest.spyOn(history, 'push');
    render(
      <TestProviders>
        <TreesList trees={[treeData]} />
      </TestProviders>
    );
    const treeTitle = screen.getByText(treeData.artdtsch || '');
    fireEvent.click(treeTitle);
    await waitFor(
      () => {
        expect(stubbedPushCall).toHaveBeenCalledWith(`/tree/${treeData.id}`);
      },
      { timeout: 500 }
    );
  });
});
