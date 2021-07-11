import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Cookie from '.';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../assets/theme';

describe('component Cookie', () => {
  test('should render content by default', () => {
    render(
      <ThemeProvider theme={theme}>
        <Cookie />
      </ThemeProvider>
    );
    const text = screen.getByText(/Diese Webseite verwendet Cookies/i);
    const morInfoLink = screen.getByText(/Weitere Informationen/i);
    const acceptButton = screen.getByText(/Einverstanden/i);
    expect(text).toBeInTheDocument();
    expect(morInfoLink).toBeInTheDocument();
    expect(acceptButton).toBeInTheDocument();
  });
  test('should not render content when accepted', () => {
    render(
      <ThemeProvider theme={theme}>
        <Cookie />
      </ThemeProvider>
    );
    const originalAcceptButton = screen.getByText(/Einverstanden/i);
    fireEvent.click(originalAcceptButton);
    const text = screen.queryByText(/Diese Webseite verwendet Cookies/i);
    const morInfoLink = screen.queryByText(/Weitere Informationen/i);
    const newAcceptButton = screen.queryByText(/Einverstanden/i);
    expect(text).not.toBeInTheDocument();
    expect(morInfoLink).not.toBeInTheDocument();
    expect(newAcceptButton).not.toBeInTheDocument();
  });
});
