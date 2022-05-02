import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { DatePickerDialog, formatDate } from '.';

const onDateChange = jest.fn();

describe('component DatePickerDialog', () => {
  test('calls onDateChange when date is changed', () => {
    const initialValue = new Date('2022-04-01T00:00:00');
    const targetValue = new Date('2022-04-02T00:00:00');
    render(
      <DatePickerDialog
        id='test-id'
        label='I am a label'
        defaultDate={initialValue}
        onDateChange={onDateChange}
      />
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toStrictEqual('01-04-2022');

    fireEvent.change(input, {
      target: { value: formatDate(targetValue) },
    });
    expect(onDateChange).toHaveBeenCalledWith(targetValue);
  });
  test('falls back to today when invalid date is provided', () => {
    const initialValue = new Date('2022-04-01T00:00:00');
    const invalidDate = '02-44-2022';
    render(
      <DatePickerDialog
        id='test-id'
        label='I am a label'
        defaultDate={initialValue}
        onDateChange={onDateChange}
      />
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toStrictEqual('01-04-2022');

    fireEvent.change(input, {
      target: { value: invalidDate },
    });
    expect(input.value).toStrictEqual(formatDate(new Date()));
  });
});
