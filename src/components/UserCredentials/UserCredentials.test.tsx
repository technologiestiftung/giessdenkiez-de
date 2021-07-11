import React from 'react';
import { render, screen } from '@testing-library/react';
import UserCredentials from '.';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../assets/theme';

describe('component UserCredentials', () => {
  test('should render the username and email', () => {
    const username = 'Bob';
    const email = 'bob@bob.bob';
    render(
      <ThemeProvider theme={theme}>
        <UserCredentials username={username} email={email} />
      </ThemeProvider>
    );
    const usernameEl = screen.getByText(username);
    const emailEl = screen.getByText(email);
    expect(usernameEl).toBeInTheDocument();
    expect(emailEl).toBeInTheDocument();
  });
  test('should render a note on registered email', () => {
    const username = 'Bob';
    const email = 'bob@bob.bob';
    render(
      <ThemeProvider theme={theme}>
        <UserCredentials username={username} email={email} />
      </ThemeProvider>
    );
    const registeredMessage = screen.getByText(/Registrierte E-Mail Adresse/i);
    expect(registeredMessage).toBeInTheDocument();
  });
});
