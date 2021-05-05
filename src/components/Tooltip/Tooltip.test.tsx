import React from 'react';
import { render, screen } from '@testing-library/react';
import { Tooltip, TooltipProps } from '.';

const exampleInput: TooltipProps = {
  title: 'title',
  subtitle: 'subtitle',
  items: {
    a: 'yo',
    b: 'yoyo',
  },
};

describe('component Tooltip', () => {
  test('should render the provided inputs', () => {
    render(<Tooltip {...exampleInput}>hello gepetto</Tooltip>);
    const titleElement = screen.getByRole('heading', {
      level: 3,
      name: 'title',
    });
    expect(titleElement).toBeInTheDocument();
    const subtitleElement = screen.getByRole('heading', {
      level: 4,
      name: 'subtitle',
    });
    expect(subtitleElement).toBeInTheDocument();
    const tableHeadElements = screen.getAllByRole('columnheader');
    tableHeadElements.forEach(el => expect(el).toBeInTheDocument());
    const tableDataElements = screen.getAllByRole('cell', { name: /yo/g });
    tableDataElements.forEach(el => expect(el).toBeInTheDocument());
    const childrenText = screen.getByText('hello gepetto');
    expect(childrenText).toBeInTheDocument();
  });
});
