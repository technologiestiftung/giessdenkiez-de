import { createGlobalStyle } from 'styled-components';
import styledNormalize from 'styled-normalize';
import { MapboxStyleOverrides } from './MapboxStyleOverrides';
import { RCSliderStyles } from './RCSliderStyles';

export default createGlobalStyle`
  ${styledNormalize}
  @font-face {
      font-family: 'IBM Plex Sans';
      src: url('/fonts/IBMPlexSans-BoldItalic.woff2') format('woff2'),
        url('/fonts/IBMPlexSans-BoldItalic.woff') format('woff');
      font-weight: bold;
      font-style: italic;
  }

  @font-face {
      font-family: 'IBM Plex Sans';
      src: url('/fonts/IBMPlexSans-TextItalic.woff2') format('woff2'),
        url('/fonts/IBMPlexSans-TextItalic.woff') format('woff');
      font-weight: 500;
      font-style: italic;
  }

  @font-face {
      font-family: 'IBM Plex Sans';
      src: url('/fonts/IBMPlexSans-Bold.woff2') format('woff2'),
        url('/fonts/IBMPlexSans-Bold.woff') format('woff');
      font-weight: bold;
      font-style: normal;
  }

  @font-face {
      font-family: 'IBM Plex Sans';
      src: url('/fonts/IBMPlexSans-Text.woff2') format('woff2'),
        url('/fonts/IBMPlexSans-Text.woff') format('woff');
      font-weight: 500;
      font-style: normal;
  }

  /* React DayPicker customizations */
  :root {
    --rdp-cell-size: 40px;
    --rdp-accent-color: #37DE8A;
    --rdp-background-color: #F9F9F9;
    --rdp-outline: 2px solid var(--rdp-accent-color);
    --rdp-outline-selected: 2px solid rgba(0, 0, 0, 0.75);
  }

  body {
    color: rgb(44, 48, 59);
    font-family: 'IBM Plex Sans', sans-serif;
  }

  .fade {
    animation: fadein .5s;
  }

  @keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  br.large {
    display: none;
    @media screen and (min-width: 768px) {
      display: block;
    }
  }

  ${MapboxStyleOverrides}
  ${RCSliderStyles}
`;
