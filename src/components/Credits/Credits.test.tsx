import React from 'react';
import { render, screen } from '@testing-library/react';
import Credits from '.';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../assets/theme';

describe('component Credits', () => {
  test('should render the CityLAB logo', () => {
    render(
      <ThemeProvider theme={theme}>
        <Credits />
      </ThemeProvider>
    );
    const citylabImage = screen.getByAltText(/Logo Citylab/i);
    expect(citylabImage).toBeInTheDocument();
    expect(citylabImage.getAttribute('src')).toContain('citylab-logo.svg');
  });
  test('should render the Technologiestiftung logo', () => {
    render(
      <ThemeProvider theme={theme}>
        <Credits />
      </ThemeProvider>
    );
    const tsbImage = screen.getByAltText(/Logo Technologiestiftung Berlin/i);
    expect(tsbImage).toBeInTheDocument();
    expect(tsbImage.getAttribute('src')).toContain('tsb-logo-coloured.svg');
  });
  test('should render the Berlin logo', () => {
    render(
      <ThemeProvider theme={theme}>
        <Credits />
      </ThemeProvider>
    );
    const berlinImage = screen.getByAltText(/Logo Berlin/i);
    expect(berlinImage).toBeInTheDocument();
    expect(berlinImage.getAttribute('src')).toContain('berlin.svg');
  });
  test('should render the "Ein Projekt der" label', () => {
    render(
      <ThemeProvider theme={theme}>
        <Credits />
      </ThemeProvider>
    );
    const einProjektDerLabel = screen.getByText(/Ein Projekt der/i);
    expect(einProjektDerLabel).toBeInTheDocument();
  });
  test('should render the "Gefördert durch" label', () => {
    render(
      <ThemeProvider theme={theme}>
        <Credits />
      </ThemeProvider>
    );
    const gefoerdertDurchLabel = screen.getByText(/Gefördert durch/i);
    expect(gefoerdertDurchLabel).toBeInTheDocument();
  });
});
