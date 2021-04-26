import React, { ReactNode } from 'react';
import { Tooltip as TooltipComp } from '.';
import { Story } from '@storybook/react/types-6-0';
import WaterDrops from '../WaterDrops';

export default {
  title: 'Tooltip',
  component: TooltipComp,
};

const Template: Story<{
  children: ReactNode;
  x: number;
  y: number;
}> = ({ children, x, y }) => (
  <TooltipComp x={x} y={y}>
    {children}
  </TooltipComp>
);

export const WithTextString = Template.bind({});
WithTextString.args = {
  x: 100,
  y: 100,
  children: 'This is a tooltip',
};

export const WithReactChildren = Template.bind({});
WithReactChildren.args = {
  x: 200,
  y: 150,
  children: (
    <>
      <b>Bold and sweaty</b> <WaterDrops dropsAmount={2} />
    </>
  ),
};
