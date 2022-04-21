import React from 'react';
import { DatePickerDialog, DatePickerDialogType } from '.';
import { Story } from '@storybook/react/types-6-0';

export default {
  title: 'DatePickerDialog',
  component: DatePickerDialog,
};

const Template: Story<DatePickerDialogType> = args => (
  <DatePickerDialog {...args} />
);

export const Default = Template.bind({});
Default.args = {
  id: 'my-id',
  label: 'Wann?',
  defaultDate: new Date('2022-04-01'),
};
