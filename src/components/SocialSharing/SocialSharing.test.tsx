import React from 'react';
import { render } from '@testing-library/react';
import SocialSharing from '.';

describe('component SocialSharing', () => {
  test('should render 4 icons', () => {
    render(<SocialSharing/>);
    const svgTag = document.querySelector('svg');
    const imgTag = document.querySelector('img');
    expect(svgTag).toBeInTheDocument();
    expect(imgTag).toBeInTheDocument();
  });
});
