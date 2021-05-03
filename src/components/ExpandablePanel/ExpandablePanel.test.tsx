import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ExpandablePanel from '.';

describe('component ExpandablePanel', () => {
  test('should render its title', () => {
    render(<ExpandablePanel title={'foo'}>some longer text</ExpandablePanel>);
    const title = screen.getByText(/foo/i);
    expect(title).toBeInTheDocument();
  });

  test('should not render its children if closed', () => {
    render(<ExpandablePanel title={'foo'}>some longer text</ExpandablePanel>);
    const longTexts = screen.queryByText(/some longer text/i);
    expect(longTexts).not.toBeInTheDocument();
  });

  test('should render its children if opened', () => {
    render(<ExpandablePanel title={'foo'}>some longer text</ExpandablePanel>);
    const title = screen.getByText(/foo/i);
    fireEvent.click(title);
    const longText = screen.getByText(/some longer text/i);
    expect(longText).toBeInTheDocument();
  });

  test('should toggle indicator when indicator or title clicked', () => {
    render(<ExpandablePanel title={'foo'}>some longer text</ExpandablePanel>);
    const indicator = screen.getByText(/\+/i);
    const title = screen.getByText(/foo/i);

    expect(indicator).toBeInTheDocument();
    // click once to open
    fireEvent.click(indicator);
    expect(indicator.innerHTML).toBe('–');
    // click title again to close
    fireEvent.click(title);
    expect(indicator.innerHTML).toBe('+');
  });
});
