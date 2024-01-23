import React from 'react';
import { render, screen } from '@testing-library/react';
import { Modal } from '.';

describe('component Modal', () => {
  afterEach(() => {
    const modals = document.querySelectorAll('#headlessui-portal-root');
    modals.forEach(modal => modal.parentNode?.removeChild(modal));
  });
  test('should render an accessible dialog', async () => {
    render(
      <Modal isOpen={true} title='I am a test title'>
        <p>Body</p>
        <button>Close me</button>
      </Modal>
    );
    const modalElement = await screen.findByRole('dialog', {
      name: 'I am a test title',
      hidden: true,
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
