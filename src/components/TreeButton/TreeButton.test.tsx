import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import TreeButton from '.';
describe('component TreeButton', () => {
  test('should render a default label', () => {
    render(<TreeButton onClickHandler={() => undefined} />);
    const label = screen.getByText('Baum');
    expect(label).toBeInTheDocument();
  });
  test('should render an icon', () => {
    render(<TreeButton onClickHandler={() => undefined} />);
    const icon = document.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });
  test('should call the give click handler', () => {
    const clickHandler = jest.fn();
    render(<TreeButton onClickHandler={clickHandler} />);
    const label = screen.getByText('Baum');
    fireEvent.click(label);
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });
});
