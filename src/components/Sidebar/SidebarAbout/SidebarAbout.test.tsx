import React from 'react';
import { render, screen } from '@testing-library/react';
import content from '../../../assets/content';
import SidebarAbout from '.';

describe('component SidebarAbout', () => {
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
