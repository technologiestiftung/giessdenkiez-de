import React from 'react';
import { render } from '@testing-library/react';
import { ImprintAndPrivacy } from '.';

describe('imprint and privacy', () => {
  test('should render two links in ImprintAndPrivacy', () => {
    const { getByText } = render(<ImprintAndPrivacy />);
    const impressumLink = getByText(/impressum/i);
    const datenschutzLink = getByText(/datenschutz/i);

    expect(impressumLink).toBeInTheDocument();
    expect(impressumLink).toHaveAttribute('href');
    expect(datenschutzLink).toBeInTheDocument();
    expect(datenschutzLink).toHaveAttribute('href');
  });
});
