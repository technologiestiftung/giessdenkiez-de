import React from 'react';

import { Story } from '@storybook/react/types-6-0';
import ButtonWater from './';
import { TestProviders } from '../../Providers/TestProviders';
import { useRouter } from 'next/router';

const config = {
  title: 'ButtonWater',
  component: ButtonWater,
  argTypes: {
    onAdoptTreeClick: { action: 'clicked adopt tree' },
    onWaterTreeClick: { action: 'clicked water tree' },
  },
};

const Template: Story = args => {
  const { push } = useRouter();
  void push('/tree/_er9lvc14r');

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

export default config;
