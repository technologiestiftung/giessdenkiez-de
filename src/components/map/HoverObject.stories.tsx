import React from 'react';
import { HoverObject, HoverObjectProps } from './HoverObject';
import { Story } from '@storybook/react/types-6-0';

export default {
  title: 'Maps Pump HoverTip',
  component: HoverObject,
};

const Template: Story<HoverObjectProps> = args => <HoverObject {...args} />;

export const HoverObjectStory = Template.bind({});
HoverObjectStory.args = {
  address: 'address',
  status: 'status',
  check_date: 'date',
  style: 'style',
  coordinates: [100, 100],
};
