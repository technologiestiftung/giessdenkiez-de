import React from 'react';
import { render } from '@testing-library/react';
import WaterDrops from '.';

describe('component WaterDrops', () => {
  test('should render no drops by default', () => {
    render(<WaterDrops />);
    const drops = document.querySelectorAll('svg');
    expect(drops).toHaveLength(0);
  });
  test('should render 3 drops if prop dropsAmount is 3', () => {
    render(<WaterDrops dropsAmount={3} />);
    const drops = document.querySelectorAll('svg');
    expect(drops).toHaveLength(3);
  });
});
