import React from 'react';
import { render, screen } from '@testing-library/react';
import { NumberInput } from '.';

describe('component NumberInput', () => {
  test('should render without crashing', () => {
    render(
      <NumberInput
        id='test-id'
        label='I am a label'
        onChange={e => console.log(e)}
      />
    );
    const inputElement = screen.getByLabelText('I am a label');
    expect(inputElement).toBeInTheDocument();
  });
});
