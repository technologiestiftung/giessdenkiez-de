import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ExpandablePanel from '.';

describe('component ExpandablePanel', () => {
  test('should render its title', () => {
    const { getByText } = render(
      <ExpandablePanel title={'foo'}>some longer text</ExpandablePanel>
    );
    const title = getByText(/foo/i);
    expect(title).toBeInTheDocument();
  });

  test('should render its children', () => {
    const { getByText } = render(
      <ExpandablePanel title={'foo'}>some longer text</ExpandablePanel>
    );
    const longText = getByText(/some longer text/i);
    expect(longText).toBeInTheDocument();
  });

  test('should toggle indicator when indicator or title clicked', () => {
    const { getByText } = render(
      <ExpandablePanel title={'foo'}>some longer text</ExpandablePanel>
    );
    const indicator = getByText(/\+/i);
    const title = getByText(/foo/i);

    expect(indicator).toBeInTheDocument();
    // click once to open
    fireEvent.click(indicator);
    expect(indicator.innerHTML).toBe('–');
    // click title again to close
    fireEvent.click(title);
    expect(indicator.innerHTML).toBe('+');
  });
});
