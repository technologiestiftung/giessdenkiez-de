import React from 'react';
import { DatePickerDialog, DatePickerDialogType } from '.';
import { Story } from '@storybook/react/types-6-0';
import { ThemeProvider } from 'styled-components';
import theme from '../../assets/theme';
import GlobalStyles from '../../assets/Global';
import 'react-day-picker/dist/style.css';

export default {
  title: 'DatePickerDialog',
  component: DatePickerDialog,
};

const Template: Story<DatePickerDialogType> = args => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <DatePickerDialog {...args} />
  </ThemeProvider>
);

export const Default = Template.bind({});
Default.args = {
  id: 'my-id',
  label: 'Wann?',
  defaultDate: new Date('2022-04-01'),
};
