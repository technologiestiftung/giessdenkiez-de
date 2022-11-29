import React from 'react';
import Overlay from './index';
import { Story } from '@storybook/react/types-6-0';
import { Providers } from '../../Providers';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Overlay',
  component: Overlay,
};

const Template: Story = _args => (
  <Providers>
    <Overlay />
  </Providers>
);

export const LegendStory = Template.bind({});
