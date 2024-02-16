import React from 'react';

import { StoryFn } from '@storybook/react';
import ButtonWater from './';
import { TestProviders } from '../../Providers/TestProviders';

const config = {
  title: 'ButtonWater',
  component: ButtonWater,
  argTypes: {
    onAdoptTreeClick: { action: 'clicked adopt tree' },
    onWaterTreeClick: { action: 'clicked water tree' },
  },
};

const Template: StoryFn = args => {
  return (
    <TestProviders>
      <ButtonWater {...args}></ButtonWater>
    </TestProviders>
  );
};

export const ButtonWaterStory = Template.bind({});
ButtonWaterStory.parameters = {
  nextRouter: {
    path: `/tree/[id]`,
    asPath: `/tree/_er9lvc14r`,
    query: {
      id: `_er9lvc14r`,
    },
  },
};
ButtonWaterStory.args = {
  isAuthenticated: true,
  isEmailVerified: true,
  waterGroup: 'visible',
};

export default config;
