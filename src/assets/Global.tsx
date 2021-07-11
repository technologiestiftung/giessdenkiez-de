import styledNormalize from 'styled-normalize';
import { createGlobalStyle } from 'styled-components';
import { RCSliderStyles } from './RCSliderStyles';
import { MapboxStyleOverrides } from './MapboxStyleOverrides';

export default createGlobalStyle`
  ${styledNormalize}

  body {
    color: rgb(44, 48, 59);
    font-family: 'IBM Plex Sans', sans-serif;
  }

  .fade {
    animation: fadein 1.5s;
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
