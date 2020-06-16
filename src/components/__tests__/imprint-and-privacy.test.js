import React from 'react';
import { render } from '@testing-library/react';
import {
  ImprintAndPrivacyCard,
  ImprintAndPrivacyContainer,
} from '../imprint-and-privacy';

describe('imprint and privacy', () => {
  it('should render two links in ImprintAndPrivacyContainer', () => {
    const { getByText } = render(<ImprintAndPrivacyContainer />);
    const impressumLink = getByText(/impressum/i);
    const datenschutzLink = getByText(/datenschutz/i);

    expect(impressumLink).toBeInTheDocument();
    expect(impressumLink).toHaveAttribute('href');
    expect(datenschutzLink).toBeInTheDocument();
    expect(datenschutzLink).toHaveAttribute('href');
  });
  it('should render two links in ImprintAndPrivacyCard', () => {
    const { getByText } = render(<ImprintAndPrivacyCard />);
    const impressumLink = getByText(/impressum/i);
    const datenschutzLink = getByText(/datenschutz/i);

    expect(impressumLink).toBeInTheDocument();
    expect(impressumLink).toHaveAttribute('href');
    expect(datenschutzLink).toBeInTheDocument();
    expect(datenschutzLink).toHaveAttribute('href');
  });
});
