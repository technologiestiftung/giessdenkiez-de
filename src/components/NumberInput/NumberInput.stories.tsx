import React from 'react';
import { NumberInput, NumberInputType } from '.';
import { Story } from '@storybook/react/types-6-0';

export default {
  title: 'NumberInput',
  component: NumberInput,
};

const Template: Story<NumberInputType> = args => <NumberInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: 'my-id',
  label: 'My label',
};
