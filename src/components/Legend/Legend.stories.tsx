import React from 'react';
import Legend from './Legend';
import { Story } from '@storybook/react/types-6-0';

export default {
  title: 'Legend',
  component: Legend,
};

const Template: Story = args => <Legend {...args} />;

export const LegendStory = Template.bind({});
LegendStory.args = {
  treesVisible: true,
  rainVisible: false,
  pumpsVisible: false,
  legendExpanded: false,
};
