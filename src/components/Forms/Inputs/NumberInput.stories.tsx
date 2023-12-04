import React from 'react';
import { NumberInput, NumberInputType } from './NumberInput';
import { Story } from '@storybook/react/types-6-0';

// eslint-disable-next-line import/no-anonymous-default-export
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
