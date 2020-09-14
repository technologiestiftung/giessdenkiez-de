import React from 'react';

import Card from './Card';
import { Story } from '@storybook/react/types-6-0';
import { treeData } from './stories-data';
export default {
  title: 'Card',
  component: Card,
};

const Template: Story = args => <Card data={args.data} {...args}></Card>;

export const CardStory = Template.bind({});
CardStory.args = {
  data: treeData,
};
