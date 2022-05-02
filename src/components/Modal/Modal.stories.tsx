import React from 'react';
import { Modal, ModalType } from '.';
import { Story } from '@storybook/react/types-6-0';

export default {
  title: 'Modal',
  component: Modal,
};

const Template: Story<ModalType> = args => (
  <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
    <Modal {...args}>{args.children}</Modal>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  title: 'This is a modal title',
  isOpen: true,
  children: <p>I am modal content</p>,
};
