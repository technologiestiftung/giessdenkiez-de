import React from 'react';
import { render, screen } from '@testing-library/react';
import { Tooltip } from '.';

describe('component Tooltip', () => {
  test('should render the provided message', () => {
    render(
      <Tooltip x={0} y={0}>
        hello gepetto
      </Tooltip>
    );
    const message = screen.getByText('hello gepetto');
    expect(message).toBeInTheDocument();
  });
  test('should render the hover object based on pointer', () => {
    render(
      <Tooltip x={500} y={300}>
        hello gepetto
      </Tooltip>
    );
    const bubble = document.querySelector('.tooltip');
    if (!bubble) throw new Error('Could not find bubble');
    const computedStyle = getComputedStyle(bubble);
    expect(computedStyle.left).toBe('497px');
    expect(computedStyle.top).toBe('255px');
  });
});
