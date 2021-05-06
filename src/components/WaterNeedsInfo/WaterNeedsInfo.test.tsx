import React from 'react';
import { render, screen } from '@testing-library/react';
import TreeWatering from '.';
import content from '../../assets/content';

describe('component TreeWatering', () => {
  test('should render all the waterNeeds blocks', () => {
    render(<TreeWatering />);
    content.sidebar.waterNeeds.forEach(waterNeed => {
      const title = screen.getByText(waterNeed.title);
      expect(title).toBeInTheDocument();
    });
  });
});
