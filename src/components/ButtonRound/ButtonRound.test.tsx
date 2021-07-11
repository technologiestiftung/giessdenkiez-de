import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ButtonRound from '.';

describe('component Button Round', () => {
  test('should render its content', () => {
    render(<ButtonRound>some longer text</ButtonRound>);
    const title = screen.getByText(/some longer text/i);
    expect(title).toBeInTheDocument();
  });
  test('should call its onClick Handler when clicked', () => {
    const customClickHandler = jest.fn();
    render(
      <ButtonRound onClick={customClickHandler}>some longer text</ButtonRound>
    );
    const button = screen.getByText(/some longer text/i);
    fireEvent.click(button);
    expect(customClickHandler).toHaveBeenCalledTimes(1);
  });
});
