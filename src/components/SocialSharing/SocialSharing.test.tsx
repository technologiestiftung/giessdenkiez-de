import React from 'react';
import { render, screen } from '@testing-library/react';
import SocialSharing from '.';

describe('component SocialSharing', () => {
  test('should render 4 sharing buttons', () => {
    render(<SocialSharing />);
    const fbButton = screen.getByRole('button', {
      name: /facebook-sharing-button/i,
    });
    const xButton = screen.getByRole('button', {
      name: /x-sharing-button/i,
    });
    const whatsappButton = screen.getByRole('button', {
      name: /whatsapp-sharing-button/i,
    });
    const mailButton = screen.getByRole('button', {
      name: /mail-sharing-button/i,
    });
    expect(fbButton).toBeInTheDocument();
    expect(xButton).toBeInTheDocument();
    expect(whatsappButton).toBeInTheDocument();
    expect(mailButton).toBeInTheDocument();
  });
});
