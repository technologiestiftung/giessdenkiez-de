import React from 'react';
import { render, screen } from '@testing-library/react';
import TreeWatering from '.';
import useLocalizedContent from '../../utils/hooks/useOverridenLocalizedContent';

describe('component TreeWatering', () => {
  test('should render all the waterNeeds blocks', () => {
    const content = useLocalizedContent('de');
    render(<TreeWatering />);
    content.sidebar.waterNeeds.forEach(waterNeed => {
      const title = screen.getByText(waterNeed.title);
      expect(title).toBeInTheDocument();
    });
  });
});
