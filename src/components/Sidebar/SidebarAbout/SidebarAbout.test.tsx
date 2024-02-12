import React from 'react';
import { render, screen } from '@testing-library/react';
import SidebarAbout from '.';
import useLocalizedContent from '../../../utils/hooks/useOverridenLocalizedContent';

describe('component SidebarAbout', () => {
  const content = useLocalizedContent('de');
  test('should render title', () => {
    render(<SidebarAbout />);

    expect(screen.getByText(/Weitere Infos/i)).toBeInTheDocument();
  });
  test('should render all about content items', () => {
    render(<SidebarAbout />);

    content.sidebar.about.forEach(item => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });
  test('should render the faq elements', () => {
    render(<SidebarAbout />);

    expect(screen.getByText(content.faq.title)).toBeInTheDocument();
    content.faq.qa.forEach(item => {
      expect(screen.getByText(item.question)).toBeInTheDocument();
    });
  });
});
