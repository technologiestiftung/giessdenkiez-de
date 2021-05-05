import React from 'react';
import { Tooltip as TooltipComp, TooltipProps } from '.';
import { Story } from '@storybook/react/types-6-0';

export default {
  title: 'Tooltip',
  component: TooltipComp,
};

const Template: Story<TooltipProps> = args => (
  <TooltipComp {...args}>{args.children}</TooltipComp>
);

export const Default = Template.bind({});
Default.args = {
  title: 'This is a title',
  items: {
    Status: 'Unknown',
    'Last update': 'Yesterday',
    Type: 'Random type',
  },
};

export const WithSubtitle = Template.bind({});
WithSubtitle.args = {
  title: 'This is a title',
  subtitle: 'Subtitle',
  items: {
    Status: 'Unknown',
    'Last update': 'Yesterday',
    Type: 'Random type',
  },
};

export const WithoutSubtitleAndWithChildren = Template.bind({});
WithoutSubtitleAndWithChildren.args = {
  title: 'This is a title',
  items: {
    Status: 'Unknown',
    'Last update': 'Yesterday',
    Type: 'Random type',
  },
  children: <span>Here be React children.</span>,
};

export const WithSubtitleAndChildren = Template.bind({});
WithSubtitleAndChildren.args = {
  title: 'This is a title',
  subtitle: 'Subtitle',
  items: {
    Status: 'Unknown',
    'Last update': 'Yesterday',
    Type: 'Random type',
  },
  children: <span>Here be React children.</span>,
};
