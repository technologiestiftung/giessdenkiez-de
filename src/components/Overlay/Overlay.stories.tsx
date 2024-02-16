import React from 'react';
import Overlay from './index';
import { StoryFn } from '@storybook/react';
import { Providers } from '../../Providers';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Overlay',
  component: Overlay,
};

const Template: StoryFn = _args => (
  <Providers>
    <Overlay />
  </Providers>
);

export const LegendStory = Template.bind({});
