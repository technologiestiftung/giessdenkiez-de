import React from 'react';
import { describe, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import { SidebarAuth } from './';
describe('component SidebarAuth', () => {
  test('should render view sigin', () => {
    render(
      <SidebarAuth
        view='signin'
        setNotification={() => undefined}
        setView={() => undefined}
        isLoading={false}
      />
    );

    expect(screen.getByText(/Anmelden/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-Mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/passwort/i)).toBeInTheDocument();
    expect(screen.getByText(/Registrier Dich/i)).toBeInTheDocument();
    expect(screen.getByText(/Passwort vergessen\?/i)).toBeInTheDocument();
  });

  test('should render view singup', () => {
    render(
      <SidebarAuth
        view='signup'
        setNotification={() => undefined}
        setView={() => undefined}
        isLoading={false}
      />
    );
    const h2 = screen.getAllByText(/Registrieren/i)[0];
    const button = screen.getAllByText(/Registrieren/i)[1];
    expect(h2).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(screen.getByLabelText(/E-Mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/passwort/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/benutzername/i)).toBeInTheDocument();
    expect(screen.getByText(/Log Dich ein/i)).toBeInTheDocument();
    expect(screen.getByText(/Passwort vergessen\?/i)).toBeInTheDocument();
  });
  test('should render view recovery', () => {
    render(
      <SidebarAuth
        view='recovery'
        setNotification={() => undefined}
        setView={() => undefined}
        isLoading={false}
      />
    );
    const h2 = screen.getByText(/Passwort vergessen/i);
    const button = screen.getByText(/Passwort zurücksetzen/i);
    expect(h2).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(screen.getByLabelText(/E-Mail/i)).toBeInTheDocument();
    expect(screen.getByText(/Zurück zur Anmeldung\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Hier klicken/i)).toBeInTheDocument();
  });
});
