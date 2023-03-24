import React from 'react';
import { render, screen } from '@testing-library/react';
import { SidebarAuth } from './index';

describe('component SidebarAuth', () => {
  test('should render view sigin', () => {
    render(
      <SidebarAuth
        view='signin'
        setNotification={() => undefined}
        setView={() => undefined}
      />
    );
    expect(screen.getByText(/Anmelden/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-Mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/passwort/i)).toBeInTheDocument();
    expect(screen.getByText(/Registrier dich/i)).toBeInTheDocument();
    expect(screen.getByText(/Passwort vergessen\?/i)).toBeInTheDocument();
  });
});
