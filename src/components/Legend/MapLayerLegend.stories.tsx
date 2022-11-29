import React from 'react';
import MapLayerLegend from './MapLayersLegend';
import { Story } from '@storybook/react/types-6-0';

const config = {
  title: 'Legend',
  component: MapLayerLegend,
};

const Template: Story = args => <MapLayerLegend {...args} />;

export const LegendStory = Template.bind({});
LegendStory.args = {
  visibleMapLayer: 'trees',
};

export default config;
