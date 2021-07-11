import React from 'react';
import { render } from '@testing-library/react';
import SquareButton from '.';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../assets/theme';

describe('component SquareButton', () => {
  test('should have a width/height even without props', () => {
    render(
      <ThemeProvider theme={theme}>
        <SquareButton />
      </ThemeProvider>
    );
    const button = document.querySelector('button');
    if (!button) throw new Error('The SquareButton could not be found');
    const { width, height } = getComputedStyle(button);
    expect(width).toBeDefined();
    expect(height).toBeDefined();
    expect(width).toBe(height);
  });
  test('should have the width/height provided as props', () => {
    render(
      <ThemeProvider theme={theme}>
        <SquareButton size={100} />
      </ThemeProvider>
    );
    const button = document.querySelector('button');
    if (!button) throw new Error('The SquareButton could not be found');
    const { width, height } = getComputedStyle(button);
    expect(width).toBe('100px');
    expect(height).toBe('100px');
  });
  test('should have the a different color when active', () => {
    render(
      <ThemeProvider theme={theme}>
        <SquareButton isActive />
        <SquareButton />
      </ThemeProvider>
    );
    const buttonA = document.querySelector('button:first-of-type');
    if (!buttonA) throw new Error('The SquareButton A could not be found');
    const buttonB = document.querySelector('button:last-of-type');
    if (!buttonB) throw new Error('The SquareButton B could not be found');
    if (buttonA === buttonB)
      throw new Error('Both SquareButtons are the same!');
    const buttonAStyles = getComputedStyle(buttonA);
    const buttonBStyles = getComputedStyle(buttonB);
    expect(buttonAStyles.color).not.toBe(buttonBStyles.color);
    expect(buttonAStyles.backgroundColor).not.toBe(
      buttonBStyles.backgroundColor
    );
  });
});
