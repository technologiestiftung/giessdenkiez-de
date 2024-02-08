import React from 'react';
import { render, screen } from '@testing-library/react';
import TreeWatering from '.';
import useLocalizedContent from '../../utils/hooks/useLocalizedContent';

describe('component TreeWatering', () => {
  test('should render all the waterNeeds blocks', () => {
    const content = useLocalizedContent();
    render(<TreeWatering />);
    content.sidebar.waterNeeds.forEach(waterNeed => {
      const title = screen.getByText(waterNeed.title);
      expect(title).toBeInTheDocument();
    });
  });
});
