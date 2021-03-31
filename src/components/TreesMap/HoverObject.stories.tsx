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
  message: 'unbekannt',
  pointer: [100, 100],
};
