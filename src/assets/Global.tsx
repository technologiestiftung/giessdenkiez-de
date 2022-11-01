import styledNormalize from 'styled-normalize';
import { createGlobalStyle } from 'styled-components';
import { RCSliderStyles } from './RCSliderStyles';
import { MapboxStyleOverrides } from './MapboxStyleOverrides';

export default createGlobalStyle`
  ${styledNormalize}

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
