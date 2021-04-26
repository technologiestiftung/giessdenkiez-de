import React from 'react';

import { Story } from '@storybook/react/types-6-0';
import ButtonWater from './';
import { TestProviders } from '../../Providers/TestProviders';
import history from '../../history';
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

const Template: Story = args => {
  history.push('/tree/_er9lvc14r');

  return (
    <TestProviders>
      <ButtonWater {...args}></ButtonWater>
    </TestProviders>
  );
};

export const ButtonWaterStory = Template.bind({});
ButtonWaterStory.args = {
  isAuthenticated: true,
  isEmailVerified: true,
  waterGroup: 'visible',
};
