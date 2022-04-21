import React from 'react';
import { render, screen } from '@testing-library/react';
import { Modal } from '.';

describe('component Modal', () => {
  test('should render an accessible dialog', () => {
    render(
      <Modal isOpen={true} title='I am a test title'>
        <p>Body</p>
        <button>Close me</button>
      </Modal>
    );
    const modalElement = screen.getByRole('dialog', {
      name: 'I am a test title',
    });
    expect(modalElement).toBeInTheDocument();

    const bodyText = screen.getByText('Body');
    expect(bodyText).toBeInTheDocument();

    const bodyButton = screen.getByRole('button', {
      name: 'Close me',
    });
    expect(bodyButton).toBeInTheDocument();
  });
});
