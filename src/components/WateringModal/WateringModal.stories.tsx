import React from 'react';
import { WateringModal, WateringModalProps } from '.';
import { Story } from '@storybook/react/types-6-0';
import { TestProviders } from '../../Providers/TestProviders';

const config = {
  component: WateringModal,
};

const Template: Story<WateringModalProps> = args => {
  return (
    <TestProviders>
      <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
        <WateringModal {...args}>{args.children}</WateringModal>
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
