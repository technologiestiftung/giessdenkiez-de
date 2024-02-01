// filename: test-utils.js
import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../src/assets/theme';

function render(ui, options) {
  function Wrapper({ children }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { render };
