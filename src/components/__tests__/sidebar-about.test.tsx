import React from 'react';
import { render } from '@testing-library/react';
import SidebarAbout from '../Sidebar/SidebarAbout';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../assets/theme';

describe('should render sidebar SidebarAbout', () => {
  // eslint-disable-next-line jest/expect-expect
  test('should render with provider', () => {
    render(
      <ThemeProvider theme={theme}>
        <SidebarAbout />
      </ThemeProvider>
    );
  });
});
