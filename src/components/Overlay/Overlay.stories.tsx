import React from 'react';
import Overlay from './index';
import { Story } from '@storybook/react/types-6-0';

export default {
  title: 'Overlay',
  component: Overlay,
};

const Template: Story = _args => <Overlay />;

export const LegendStory = Template.bind({});
