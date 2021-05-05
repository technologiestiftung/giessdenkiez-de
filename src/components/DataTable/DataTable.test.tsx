import React from 'react';
import { render, screen } from '@testing-library/react';
import { DataTable, DataTableType } from '.';

const exampleInput: DataTableType = {
  title: 'title',
  subtitle: 'subtitle',
  items: {
    a: 'yo',
    b: 'yoyo',
  },
};

describe('component DataTable', () => {
  test('should render the provided inputs', () => {
    render(<DataTable {...exampleInput}>hello gepetto</DataTable>);
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
