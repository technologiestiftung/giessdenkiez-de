import React from 'react';
import { render } from '@testing-library/react';
import ButtonRound from './';
describe('test', () => {
  test('should pass', () => {
    const { getByText } = render(<ButtonRound>Text</ButtonRound>);
    const button = getByText(/text/i);
    expect(button).toHaveAttribute('type', 'button');
  });
});
