import React from 'react';

import { Story } from '@storybook/react/types-6-0';
import ButtonWater from './';
export default {
  title: 'ButtonWater',
  component: ButtonWater,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  argTypes: {
    onAdoptTreeClick: { action: 'clicked adopt tree' },
    onWaterTreeClick: { action: 'clicked water tree' },
  },
};

const Template: Story = args => <ButtonWater {...args}></ButtonWater>;

export const ButtonWaterStory = Template.bind({});
ButtonWaterStory.args = {
  isAuthenticated: true,
  isEmailVerified: true,
  waterGroup: 'visible',
};

export const ButtonWateringStory = Template.bind({});
ButtonWateringStory.args = {
  isAuthenticated: true,
  isEmailVerified: true,
  waterGroup: 'watering',
};
