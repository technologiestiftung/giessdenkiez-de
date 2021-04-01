import React from 'react';
import { render, screen } from '@testing-library/react';
import { HoverObject } from './HoverObject';

describe('component HoverObject', () => {
  test('should render the provided message', () => {
    render(<HoverObject message='hello gepetto' pointer={[0, 0]} />);
    const message = screen.getByText('hello gepetto');
    expect(message).toBeInTheDocument();
  });
  test('should render the hover object based on pointer', () => {
    render(<HoverObject message='hello gepetto' pointer={[500, 300]} />);
    const bubble = document.querySelector('.is-size-7');
    if (!bubble) throw new Error('Could not find bubble');
    const computedStyle = getComputedStyle(bubble);
    expect(computedStyle.left).toBe('497px');
    expect(computedStyle.top).toBe('255px');
  });
});
