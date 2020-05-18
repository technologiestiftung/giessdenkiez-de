import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ButtonRound from './';
describe('button round tests', () => {
  test('should have a basic functionality', () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <ButtonRound toggle={onClick}>Text</ButtonRound>
    );
    const button = getByText(/text/i);
    fireEvent.click(button);
    expect(button).toHaveAttribute('role', 'button');
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
