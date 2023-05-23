import React from 'react';
import { AccountEditModal, AccountEditModalProps } from '.';
import { Story } from '@storybook/react/types-6-0';
import { TestProviders } from '../../Providers/TestProviders';

const config = {
  component: AccountEditModal,
};

const Template: Story<AccountEditModalProps> = args => {
  return (
    <TestProviders>
      <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
        <AccountEditModal {...args}>{args.children}</AccountEditModal>
      </div>
    </TestProviders>
  );
};

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  setIsOpen: () => undefined,
  children: <p>I am modal content</p>,
};

export default config;
