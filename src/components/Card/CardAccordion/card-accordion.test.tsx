import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CardAccordion from './index';

describe('card accordion test', () => {
  test('should render a card', () => {
    const { getByText } = render(
      <CardAccordion title={'foo'}>
        {<div>{'some longer text'}</div>}
      </CardAccordion>
    );
    const indicator = getByText(/\+/i);
    const title = getByText(/foo/i);
    const longText = getByText(/some longer text/i);
    expect(longText).toBeInTheDocument(); // CSS is not evaluated
    expect(indicator).toBeInTheDocument();
    // click once to open
    fireEvent.click(indicator);
    expect(indicator.innerHTML).toBe('–');
    // click title again to close
    fireEvent.click(title);
    expect(indicator.innerHTML).toBe('+');
  });
});
